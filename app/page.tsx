import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ImageIcon,
  VideoIcon,
  MessageSquareTextIcon,
  SparklesIcon,
  DollarSign,
} from "lucide-react";
import DashboardHeader from "@/components/dashboard-header";
import ImageGenerator from "@/components/image-generator";
import VideoGenerator from "@/components/video-generator";
import SocialPostGenerator from "@/components/social-post-generator";
import Link from "next/link";
import AdUnit from "@/components/ad-unit";
import { AD } from "@/components/ads";
import AdBanner from "@/components/AdBanner";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 p-6 container mx-auto max-w-7xl">
        <div className="flex flex-col space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-primary">
              AI Content Studio
            </h1>
            <p className="text-muted-foreground">
              Generate professional content with AI. Create images, videos, and
              social media posts in seconds.
            </p>
          </div>

          <Tabs defaultValue="images" className="space-y-4 text-primary">
            <TabsList className="grid grid-cols-3 w-full max-w-md">
              <TabsTrigger value="images">
                <ImageIcon className="h-4 w-4 mr-2" />
                Images
              </TabsTrigger>
              <TabsTrigger value="videos">
                <VideoIcon className="h-4 w-4 mr-2" />
                Videos
              </TabsTrigger>
              <TabsTrigger value="social">
                <MessageSquareTextIcon className="h-4 w-4 mr-2" />
                Social Posts
              </TabsTrigger>
            </TabsList>

            <TabsContent value="images" className="space-y-4">
              <ImageGenerator />
            </TabsContent>

            <TabsContent value="videos" className="space-y-4">
              <VideoGenerator />
            </TabsContent>

            <TabsContent value="social" className="space-y-4">
              <SocialPostGenerator />
            </TabsContent>
          </Tabs>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Premium Features</CardTitle>
                <CardDescription>
                  Unlock advanced AI capabilities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <SparklesIcon className="h-4 w-4 mr-2 text-primary" />
                    Higher resolution outputs
                  </li>
                  <li className="flex items-center">
                    <SparklesIcon className="h-4 w-4 mr-2 text-primary" />
                    Advanced customization options
                  </li>
                  <li className="flex items-center">
                    <SparklesIcon className="h-4 w-4 mr-2 text-primary" />
                    Batch generation
                  </li>
                  <li className="flex items-center">
                    <SparklesIcon className="h-4 w-4 mr-2 text-primary" />
                    Commercial usage rights
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Upgrade to Pro</Button>
              </CardFooter>
            </Card>
            <AdBanner
              dataAdFormat="auto"
              dataFullWidthResponsive={true}
              dataAdSlot={process.env.NEXT_PUBLIC_GOOGLE_AD_SLOT_ID!}
            />

            <AdBanner
              dataAdFormat="auto"
              dataFullWidthResponsive={true}
              dataAdSlot={process.env.NEXT_PUBLIC_GOOGLE_AD_SLOT_ID!}
            />

            <AdBanner
              dataAdFormat="auto"
              dataFullWidthResponsive={true}
              dataAdSlot={process.env.NEXT_PUBLIC_GOOGLE_AD_SLOT_ID!}
            />
            <AD />
          </div>
        </div>
      </main>
    </div>
  );
}
