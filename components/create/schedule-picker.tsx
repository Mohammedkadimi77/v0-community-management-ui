"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CalendarIcon, Clock, Zap } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
]

export function SchedulePicker() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [time, setTime] = useState("10:00 AM")
  const [publishType, setPublishType] = useState<"now" | "schedule">("schedule")

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Schedule</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Publish Type Toggle */}
        <div className="flex gap-2">
          <Button
            variant={publishType === "now" ? "default" : "outline"}
            size="sm"
            className="flex-1 gap-2"
            onClick={() => setPublishType("now")}
          >
            <Zap className="h-4 w-4" />
            Publish Now
          </Button>
          <Button
            variant={publishType === "schedule" ? "default" : "outline"}
            size="sm"
            className="flex-1 gap-2"
            onClick={() => setPublishType("schedule")}
          >
            <Clock className="h-4 w-4" />
            Schedule
          </Button>
        </div>

        {publishType === "schedule" && (
          <>
            {/* Date Picker */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            {/* Time Picker */}
            <Select value={time} onValueChange={setTime}>
              <SelectTrigger>
                <Clock className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((slot) => (
                  <SelectItem key={slot} value={slot}>
                    {slot}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Best Time Suggestion */}
            <div className="rounded-lg bg-primary/10 p-3">
              <p className="text-xs font-medium text-primary">AI Recommendation</p>
              <p className="mt-1 text-sm">
                Best time to post: <strong>Tuesday, 10:00 AM</strong>
              </p>
              <p className="text-xs text-muted-foreground">
                Based on your audience&apos;s activity patterns
              </p>
            </div>
          </>
        )}

        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          <Button className="w-full">
            {publishType === "now" ? "Publish Now" : "Schedule Post"}
          </Button>
          <Button variant="outline" className="w-full">
            Save as Draft
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
