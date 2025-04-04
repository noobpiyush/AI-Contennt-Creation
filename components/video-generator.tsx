"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Share, Sparkles, Loader2, Play, Pause, Settings } from "lucide-react"
import Image from "next/image"

export default function VideoGenerator() {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedVideo, setGeneratedVideo] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)

  const handleGenerate = () => {
    if (!prompt) return

    setIsGenerating(true)

    // Simulate AI video generation
    setTimeout(() => {
      setGeneratedVideo("/placeholder.svg?height=512&width=512")
      setIsGenerating(false)
    }, 3000)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="video-prompt">Prompt</Label>
              <Textarea
                id="video-prompt"
                placeholder="Describe the video you want to generate..."
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
                  <Label>Duration</Label>
                  <Select defaultValue="3">
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 seconds</SelectItem>
                      <SelectItem value="5">5 seconds</SelectItem>
                      <SelectItem value="10">10 seconds</SelectItem>
                      <SelectItem value="15">15 seconds</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Resolution</Label>
                  <Select defaultValue="512">
                    <SelectTrigger>
                      <SelectValue placeholder="Select resolution" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="512">512x512</SelectItem>
                      <SelectItem value="768">768x768</SelectItem>
                      <SelectItem value="1024">1024x1024</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="motion-strength">Motion Strength</Label>
                    <span className="text-sm text-muted-foreground">35</span>
                  </div>
                  <Slider id="motion-strength" defaultValue={[35]} max={100} min={1} step={1} />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="fps">Frames Per Second</Label>
                    <span className="text-sm text-muted-foreground">24</span>
                  </div>
                  <Slider id="fps" defaultValue={[24]} max={60} min={15} step={1} />
                </div>

                <div className="space-y-2">
                  <Label>Style Preset</Label>
                  <Select defaultValue="cinematic">
                    <SelectTrigger>
                      <SelectValue placeholder="Select style preset" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cinematic">Cinematic</SelectItem>
                      <SelectItem value="animation">Animation</SelectItem>
                      <SelectItem value="documentary">Documentary</SelectItem>
                      <SelectItem value="music-video">Music Video</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>
            </Tabs>

            <Button className="w-full" onClick={handleGenerate} disabled={!prompt || isGenerating}>
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Video
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="aspect-video relative bg-muted rounded-md overflow-hidden flex items-center justify-center">
              {generatedVideo ? (
                <>
                  <Image
                    src={generatedVideo || "/placeholder.svg"}
                    alt="Generated video placeholder"
                    fill
                    className="object-cover"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute inset-0 m-auto bg-background/50 hover:bg-background/70"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                  </Button>
                </>
              ) : (
                <div className="text-center p-4">
                  <p className="text-muted-foreground">Your generated video will appear here</p>
                </div>
              )}
            </div>

            {generatedVideo && (
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
      <div className="mt-4 p-4 border rounded-md bg-muted/30">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium">Advertisement</p>
          <Button variant="ghost" size="sm" className="h-6 text-xs">
            <Settings className="h-3 w-3 mr-1" />
            Ad Settings
          </Button>
        </div>
        <div className="h-[90px] flex items-center justify-center border border-dashed">
          <p className="text-sm text-muted-foreground">Google Ad will appear here</p>
        </div>
      </div>
    </div>
  )
}

