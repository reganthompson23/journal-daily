"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"

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
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg hover:shadow-xl transition-all duration-200">
          <CardHeader className="space-y-1 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold text-slate-800">Journal Entry</CardTitle>
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-[200px] pl-3 text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(date, "MMMM d, yyyy")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => newDate && setDate(newDate)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <Textarea
                placeholder="Write your thoughts for today..."
                className="min-h-[300px] resize-none p-4 text-lg focus:ring-2 focus:ring-orange-200"
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
              />
              <div className="flex justify-end">
                <span className={`text-sm px-3 py-1 rounded-full ${
                  isSaving 
                    ? "bg-orange-100 text-orange-700" 
                    : "bg-green-100 text-green-700"
                }`}>
                  {isSaving ? "Saving..." : "Saved"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default JournalEntry