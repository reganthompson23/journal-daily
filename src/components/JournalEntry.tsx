"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Calendar } from "./ui/calendar"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover"
import { Textarea } from "./ui/textarea"

export function JournalEntry() {
  const [date, setDate] = React.useState<Date | undefined>(undefined)
  const [entry, setEntry] = React.useState("")
  const [isSaving, setIsSaving] = React.useState(false)

  React.useEffect(() => {
    setDate(new Date())
  }, [])

  React.useEffect(() => {
    const saveEntry = async () => {
      if (entry.trim()) {
        setIsSaving(true)
        await new Promise(resolve => setTimeout(resolve, 1000))
        setIsSaving(false)
      }
    }

    const timeout = setTimeout(saveEntry, 1000)
    return () => clearTimeout(timeout)
  }, [entry])

  if (!date) return null

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto">
        <Card className="rounded-lg border bg-card text-card-foreground shadow-lg hover:shadow-xl transition-shadow duration-200">
          <CardHeader className="p-6 flex flex-row items-center justify-between space-y-0 border-b">
            <CardTitle className="text-2xl font-bold text-primary">Journal Entry</CardTitle>
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-[240px] justify-start text-left font-normal hover:bg-accent"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(date, "MMMM do, yyyy")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => newDate && setDate(newDate)}
                  initialFocus
                  className="rounded-md border"
                />
              </PopoverContent>
            </Popover>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <Textarea
              placeholder="Write your thoughts for today..."
              className="min-h-[300px] w-full resize-none p-4 text-lg border rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
            />
            <div className="flex justify-end">
              <span className="text-sm text-muted-foreground font-medium px-2 py-1 rounded-md bg-secondary">
                {isSaving ? "Saving..." : "Saved"}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

export default JournalEntry