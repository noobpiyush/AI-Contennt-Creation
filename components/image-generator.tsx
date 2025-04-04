"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Share, Sparkles, Loader2, Settings } from "lucide-react";
import Image from "next/image";
import { toast } from "@/hooks/use-toast";
import AdBanner from "./AdBanner";

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [style, setStyle] = useState("realistic");
  const [aspectRatio, setAspectRatio] = useState("square");
  const [guidanceScale, setGuidanceScale] = useState(7.5);
  const [seed, setSeed] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState("");
  const [imageDescription, setImageDescription] = useState("");

  const handleGenerate = async () => {
    if (!prompt) {
      toast({
        title: "Error",
        description: "Please enter a prompt",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      const response = await fetch("/api/generate/image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          style,
          aspectRatio,
          negativePrompt,
          guidanceScale,
          seed,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to generate image");
      }

      const blob = await response.blob(); // Get image as a Blob
      const imageUrl = URL.createObjectURL(blob); // Create object URL
      setGeneratedImage(imageUrl); // Set the generated image

      toast({
        title: "Success",
        description: "Image generated successfully",
      });
    } catch (error) {
      console.error("Error generating image:", error);
      toast({
        title: "Error",
        // description: error || "Failed to generate image",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="prompt">Prompt</Label>
              <Textarea
                id="prompt"
                placeholder="Describe the image you want to generate..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <Tabs defaultValue="basic">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="basic">Basic</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Style</Label>
                  <Select value={style} onValueChange={setStyle}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realistic">Realistic</SelectItem>
                      <SelectItem value="anime">Anime</SelectItem>
                      <SelectItem value="digital-art">Digital Art</SelectItem>
                      <SelectItem value="oil-painting">Oil Painting</SelectItem>
                      <SelectItem value="watercolor">Watercolor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Aspect Ratio</Label>
                  <Select value={aspectRatio} onValueChange={setAspectRatio}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select aspect ratio" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="square">Square (1:1)</SelectItem>
                      <SelectItem value="portrait">Portrait (2:3)</SelectItem>
                      <SelectItem value="landscape">Landscape (3:2)</SelectItem>
                      <SelectItem value="wide">Widescreen (16:9)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="negative-prompt">Negative Prompt</Label>
                  <Textarea
                    id="negative-prompt"
                    placeholder="Elements to exclude from the image..."
                    value={negativePrompt}
                    onChange={(e) => setNegativePrompt(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="guidance-scale">Guidance Scale</Label>
                    <span className="text-sm text-muted-foreground">
                      {guidanceScale}
                    </span>
                  </div>
                  <Slider
                    id="guidance-scale"
                    value={[guidanceScale]}
                    onValueChange={(value) => setGuidanceScale(value[0])}
                    max={15}
                    min={1}
                    step={0.1}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Seed</Label>
                  <Input
                    type="number"
                    placeholder="Random"
                    value={seed || ""}
                    onChange={(e) =>
                      setSeed(
                        e.target.value ? Number.parseInt(e.target.value) : null
                      )
                    }
                  />
                </div>
              </TabsContent>
            </Tabs>

            <Button
              className="w-full"
              onClick={handleGenerate}
              disabled={!prompt || isGenerating}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Image
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="aspect-square relative bg-muted rounded-md overflow-hidden flex items-center justify-center">
              {generatedImage ? (
                <Image
                  src={generatedImage || "/placeholder.svg"}
                  alt="Generated image"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="text-center p-4">
                  <p className="text-muted-foreground">
                    Your generated image will appear here
                  </p>
                </div>
              )}
            </div>

            {imageDescription && (
              <div className="text-sm text-muted-foreground">
                <p>{imageDescription}</p>
              </div>
            )}

            {generatedImage && (
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Google Ads Banner */}
      <AdBanner 
        dataAdFormat="auto"
        dataFullWidthResponsive = {true}
        dataAdSlot={process.env.NEXT_PUBLIC_GOOGLE_AD_SLOT_ID!}
      />
    </div>
  );
}
