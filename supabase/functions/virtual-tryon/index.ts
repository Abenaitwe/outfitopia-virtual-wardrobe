
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
      processedSelfieImage = selfieImage.split(',')[1];
    }
    
    // Process the outfit image - could be a URL or base64
    let processedOutfitImage;
    if (outfitImage.startsWith('data:')) {
      // Already base64 data URL
      processedOutfitImage = outfitImage.split(',')[1];
    } else if (outfitImage.startsWith('/')) {
      // It's a path to an image, we need to fetch it
      try {
        // Get the host URL from request headers
        const host = req.headers.get('host') || '';
        const origin = req.headers.get('origin') || '';
        let baseUrl = origin;
        
        if (!baseUrl && host) {
          const protocol = host.includes('localhost') ? 'http' : 'https';
          baseUrl = `${protocol}://${host}`;
        }
        
        // Fetch the image
        console.log(`Fetching outfit image from: ${baseUrl}${outfitImage}`);
        const imageResponse = await fetch(`${baseUrl}${outfitImage}`);
        
        if (!imageResponse.ok) {
          throw new Error(`Failed to fetch outfit image: ${imageResponse.status}`);
        }
        
        // Convert the image to base64
        const imageArrayBuffer = await imageResponse.arrayBuffer();
        const imageBase64 = btoa(String.fromCharCode(...new Uint8Array(imageArrayBuffer)));
        processedOutfitImage = imageBase64;
      } catch (error) {
        console.error('Error fetching outfit image:', error);
        throw new Error(`Failed to process outfit image: ${error.message}`);
      }
    } else {
      // Assume it's already base64 without the data URL prefix
      processedOutfitImage = outfitImage;
    }

    // Create content for Gemini API in the correct format
    const contents = [
      {
        parts: [
          {
            text: "Generate a realistic image of this person wearing this exact outfit. Make it photorealistic and ensure the person's face and features are preserved exactly."
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
    ];

    console.log('Requesting virtual try-on with Gemini API...');

    // Call the Gemini API using the proper format for image generation
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp-image-generation:generateContent?key=${GEMINI_API_KEY}`, 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents,
          generationConfig: {
            responseModalities: ['Text', 'Image'],
            temperature: 0.4,
            topK: 32,
            topP: 1,
          }
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response from Gemini API:', errorText);
      throw new Error(`Gemini API returned status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log('Gemini API response received');

    // Extract the generated image if available
    let generatedImage = null;
    try {
      // Check if response contains an image in the candidates
      if (data.candidates && data.candidates[0].content && data.candidates[0].content.parts) {
        for (const part of data.candidates[0].content.parts) {
          if (part.inlineData) {
            generatedImage = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
            break;
          }
        }
      }
    } catch (err) {
      console.error('Error extracting image from Gemini response:', err);
      console.log('Response structure:', JSON.stringify(data));
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
