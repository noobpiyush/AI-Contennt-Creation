"use client"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"

export const AD = () => {
    return <Card>
    <CardHeader>
      <CardTitle>Recent Creations</CardTitle>
      <CardDescription>Your recently generated content</CardDescription>
    </CardHeader>
    <CardContent className="h-[180px] flex items-center justify-center border-2 border-dashed rounded-md">
      <p className="text-sm text-muted-foreground">Your recent creations will appear here</p>
    </CardContent>
    <CardFooter>
      <Button variant="outline" className="w-full">
        View All
      </Button>
    </CardFooter>
  </Card>
}