import * as React from 'react'
import { Progress } from '@/components/ui/progress'

interface TrafficBarProps {
  progress: number
}

const TrafficBar = ({ progress }: TrafficBarProps) => (
  <Progress
    value={progress}
    className="h-2 w-full bg-white/10"
  />
)

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Website {
  name: string
  traffic: number
}

interface TrafficByWebsiteProps {
  websites: Website[]
}

const TrafficByWebsite = ({ websites }: TrafficByWebsiteProps) => {
  return (
    <Card className="w-full max-w-md bg-white/10 text-white">
      <CardHeader>
        <CardTitle className="text-xl font-medium">
          Traffic by Website
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {websites.map((site, index) => (
          <div
            key={index}
            className="flex items-center gap-4">
            <div className="w-24 flex-shrink-0 text-sm">{site.name}</div>
            <div className="flex-grow">
              <TrafficBar progress={site.traffic} />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default TrafficByWebsite
