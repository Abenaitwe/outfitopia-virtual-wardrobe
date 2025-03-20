
import { supabase } from "@/integrations/supabase/client";
import { toast } from '@/components/ui/use-toast';

export async function generateTryOnImage(
  selfieImage: string, 
  outfitImage: string
): Promise<string | null> {
  if (!selfieImage || !outfitImage) {
    toast({
      title: "Missing images",
      description: "Both a selfie and outfit are required for virtual try-on",
      variant: "destructive"
    });
    return null;
  }

  toast({
    title: "Generating your look",
    description: "Please wait while we fit your outfit..."
  });

  try {
    console.log('Sending try-on request with:');
    console.log('- Selfie image:', selfieImage.substring(0, 50) + '...');
    console.log('- Outfit image:', outfitImage);

    const { data, error } = await supabase.functions.invoke('virtual-tryon', {
      body: {
        selfieImage: selfieImage,
        outfitImage: outfitImage
      },
    });

    if (error) {
      console.error('Supabase function error:', error);
      throw new Error(error.message);
    }

    if (data.error) {
      console.error('Function returned error:', data.error);
      throw new Error(data.error);
    }

    if (data.generatedImage) {
      toast({
        title: "Try-on complete",
        description: "Here's how you look in this outfit!"
      });
      return data.generatedImage;
    } else {
      throw new Error("No image was generated");
    }
  } catch (error) {
    console.error("Error generating try-on image:", error);
    toast({
      title: "Generation failed",
      description: error instanceof Error ? error.message : "Failed to generate try-on image",
      variant: "destructive"
    });
    return null;
  }
}
