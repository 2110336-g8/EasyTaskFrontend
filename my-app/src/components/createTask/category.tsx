import { Bold, Italic, Underline } from "lucide-react"

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

export function Categories() {
  return (
    <div>
        <ToggleGroup size={"sm"} type="multiple" className="gap-2 mt-2 justify-start">
        <ToggleGroupItem value="general" aria-label="Toggle bold">
            General
        </ToggleGroupItem>
        <ToggleGroupItem value="graphic" aria-label="Toggle bold">
            Graphic
        </ToggleGroupItem>
        <ToggleGroupItem value="marketing" aria-label="Toggle bold">
            Marketing
        </ToggleGroupItem>
        </ToggleGroup>

        <ToggleGroup size={"sm"} type="multiple" className="gap-2 mt-2 justify-start">
            <ToggleGroupItem value="translation" aria-label="Toggle bold">
                Translation
            </ToggleGroupItem>
            <ToggleGroupItem value="consultant" aria-label="Toggle bold">
                Consultant
            </ToggleGroupItem>
        </ToggleGroup>

        <ToggleGroup size={"sm"} type="multiple" className="gap-2 mt-2 justify-start">
            <ToggleGroupItem value="programmingAndTech" aria-label="Toggle bold">
                Programming and Tech
            </ToggleGroupItem>
        </ToggleGroup>

        <ToggleGroup size={"sm"} type="multiple" className="gap-2 mt-2 justify-start">
            <ToggleGroupItem value="imagesAndSound" aria-label="Toggle bold">
                Images and Sound
            </ToggleGroupItem>
            <ToggleGroupItem value="management" aria-label="Toggle bold">
                Management
            </ToggleGroupItem>
        </ToggleGroup>
    </div>
  )
}
