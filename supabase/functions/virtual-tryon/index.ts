
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not set');
    }

    const { selfieImage, outfitImage } = await req.json();
    
    if (!selfieImage || !outfitImage) {
      return new Response(
        JSON.stringify({ error: 'Both selfieImage and outfitImage are required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Processing images for virtual try-on...');
    
    // Process the selfie image - already in base64 format from the client
    let processedSelfieImage = selfieImage;
    if (selfieImage.startsWith('data:')) {
      processedSelfieImage = selfieImage.replace(/^data:image\/[a-z]+;base64,/, '');
    }
    
    // Process the outfit image - could be a URL or base64
    let processedOutfitImage;
    if (outfitImage.startsWith('data:')) {
      // Already base64 data URL
      processedOutfitImage = outfitImage.replace(/^data:image\/[a-z]+;base64,/, '');
    } else if (outfitImage.startsWith('/')) {
      // It's a path to an image, we need to fetch it
      try {
        // Get the host URL from request headers
        const host = req.headers.get('host') || '';
        const protocol = host.includes('localhost') ? 'http' : 'https';
        const baseUrl = `${protocol}://${host}`;
        
        // Fetch the image
        console.log(`Fetching outfit image from: ${baseUrl}${outfitImage}`);
        const imageResponse = await fetch(`${baseUrl}${outfitImage}`);
        
        if (!imageResponse.ok) {
          throw new Error(`Failed to fetch outfit image: ${imageResponse.status}`);
        }
        
        // Convert the image to base64
        const imageArrayBuffer = await imageResponse.arrayBuffer();
        const imageBase64 = btoa(
          new Uint8Array(imageArrayBuffer)
            .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
        processedOutfitImage = imageBase64;
      } catch (error) {
        console.error('Error fetching outfit image:', error);
        throw new Error(`Failed to process outfit image: ${error.message}`);
      }
    } else {
      // Assume it's already base64 without the data URL prefix
      processedOutfitImage = outfitImage;
    }

    console.log('Requesting virtual try-on with Gemini API...');

    // Call the Gemini API with the gemini-pro-vision model
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=' + GEMINI_API_KEY, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: "Generate an image of the person in the first image wearing the clothing item from the second image. Make it look natural and realistic. Generate only the image, no text."
              },
              {
                inline_data: {
                  mime_type: "image/jpeg",
                  data: processedSelfieImage
                }
              },
              {
                inline_data: {
                  mime_type: "image/jpeg",
                  data: processedOutfitImage
                }
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.4,
          topK: 32,
          topP: 1,
          maxOutputTokens: 4096,
        }
      }),
    });

    const data = await response.json();
    console.log('Gemini API response received');

    // Extract the generated image if available
    let generatedImage = null;
    try {
      // Check if response contains an image
      if (data.candidates && data.candidates[0].content.parts) {
        for (const part of data.candidates[0].content.parts) {
          if (part.inline_data && part.inline_data.mime_type.startsWith('image/')) {
            generatedImage = `data:${part.inline_data.mime_type};base64,${part.inline_data.data}`;
            break;
          }
        }
      }
    } catch (err) {
      console.error('Error extracting image from Gemini response:', err);
    }

    // If no image was found in the response
    if (!generatedImage) {
      console.log('No image generated. Full response:', JSON.stringify(data));
      return new Response(
        JSON.stringify({ 
          error: 'Failed to generate image',
          details: data
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    return new Response(
      JSON.stringify({ generatedImage }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in virtual-tryon function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
