"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import ReactMarkdown from "react-markdown";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Share, Sparkles, Loader2, Copy } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";

export default function SocialPostGenerator() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");

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
      const response = await fetch(
        "/api/generate/social-post",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to generate content");
      }

      const json = await response.json();
      const text =
        json?.candidates?.[0]?.content?.parts?.[0]?.text || "No content found.";

      setGeneratedContent(text);

      toast({
        title: "Success",
        description: "Content generated successfully",
      });
    } catch (error) {
      console.error("Error generating content:", error);
      toast({
        title: "Error",
        description: "Something went wrong while generating content",
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
              <Label htmlFor="social-prompt">
                What do you want to post about?
              </Label>
              <Textarea
                id="social-prompt"
                placeholder="Describe what you want to post about..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <Tabs defaultValue="platform">
              <TabsList className="w-full mx-auto">
                <TabsTrigger value="platform">Platform</TabsTrigger>
                {/* <TabsTrigger value="tone">Tone & Style</TabsTrigger> */}
              </TabsList>

              <TabsContent value="platform" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Platform</Label>
                  <Select defaultValue="twitter">
                    <SelectTrigger>
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="twitter">Twitter/X</SelectItem>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="facebook">Facebook</SelectItem>
                      <SelectItem value="linkedin">LinkedIn</SelectItem>
                      <SelectItem value="tiktok">TikTok</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Content Type</Label>
                  <Select defaultValue="text">
                    <SelectTrigger>
                      <SelectValue placeholder="Select content type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Text Only</SelectItem>
                      {/* <SelectItem value="image">Text + Image</SelectItem>
                      <SelectItem value="carousel">Carousel</SelectItem>
                      <SelectItem value="thread">Thread</SelectItem> */}
                    </SelectContent>
                  </Select>
                </div>

                {/* <div className="flex items-center justify-between">
                  <Label htmlFor="include-hashtags">Include Hashtags</Label>
                  <Switch id="include-hashtags" defaultChecked />
                </div> */}
              </TabsContent>

              {/* <TabsContent value="tone" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Tone</Label>
                  <Select defaultValue="professional">
                    <SelectTrigger>
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="friendly">Friendly</SelectItem>
                      <SelectItem value="humorous">Humorous</SelectItem>
                      <SelectItem value="inspirational">Inspirational</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Target Audience</Label>
                  <Input placeholder="e.g., Professionals, Students, Parents" />
                </div>

                <div className="space-y-2">
                  <Label>Brand Voice</Label>
                  <Textarea placeholder="Describe your brand voice or paste your brand guidelines..." />
                </div>
              </TabsContent> */}
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
                  Generate Post
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="border rounded-md p-4 space-y-4">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src="/placeholder-user.jpg" alt="@user" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">Your Brand</p>
                  <p className="text-xs text-muted-foreground">@yourbrand</p>
                </div>
              </div>

              <div className="min-h-[100px] text-sm">
                {generatedContent ? (
                  <div className="border rounded-lg p-4 bg-gray-50 max-h-[300px] overflow-y-auto text-sm whitespace-pre-wrap break-words leading-relaxed font-medium text-gray-800">
                    <ReactMarkdown>{generatedContent}</ReactMarkdown>
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    Your generated post will appear here
                  </p>
                )}
              </div>
            </div>

            {generatedContent && (
              <div className="flex gap-2 mt-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() =>
                    navigator.clipboard.writeText(generatedContent)
                  }
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => console.log("Share functionality here")}
                >
                  <Share className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
