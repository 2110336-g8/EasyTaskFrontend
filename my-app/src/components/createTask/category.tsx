import { Bold, Italic, Underline } from "lucide-react"
import { useState } from 'react';
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

export function Categories() {
    const [generalSelected, setGeneralSelected] = useState(false);
    const [graphicSelected, setGraphicSelected] = useState(false);
    const [marketingSelected, setMarketingSelected] = useState(false);
    const [translationSelected, setTranslationSelected] = useState(false);
    const [consultantSelected, setConsultantSelected] = useState(false);
    const [programmingAndTechSelected, setProgrammingAndTechSelected] = useState(false);
    const [imagesAndSoundSelected, setImagesAndSoundSelected] = useState(false);
    const [managementSelected, setManagementSelected] = useState(false);

    const handleGeneralToggle = () => {
        setGeneralSelected(!generalSelected);
        setGraphicSelected(false);
        setMarketingSelected(false);
      };
    
      const handleGraphicToggle = () => {
        setGraphicSelected(!graphicSelected);
        setGeneralSelected(false);
        setMarketingSelected(false);
      };
    
      const handleMarketingToggle = () => {
        setMarketingSelected(!marketingSelected);
        setGeneralSelected(false);
        setGraphicSelected(false);
      };
    
      const handleTranslationToggle = () => {
        setTranslationSelected(!translationSelected);
        setConsultantSelected(false);
      };
    
      const handleConsultantToggle = () => {
        setConsultantSelected(!consultantSelected);
        setTranslationSelected(false);
      };
    
      const handleProgrammingAndTechToggle = () => {
        setProgrammingAndTechSelected(!programmingAndTechSelected);
      };
    
      const handleImagesAndSoundToggle = () => {
        setImagesAndSoundSelected(!imagesAndSoundSelected);
        setManagementSelected(false);
      };
    
      const handleManagementToggle = () => {
        setManagementSelected(!managementSelected);
        setImagesAndSoundSelected(false);
      };

  return (
    <div>
      <ToggleGroup size={"sm"} type="single" className="gap-2 mt-2 justify-start flex-col">

        <div className="gap-2 justify-start">
            <ToggleGroupItem className="mr-2" value="general" onClick={handleGeneralToggle} aria-label="Toggle bold" active={generalSelected}>
            General
            </ToggleGroupItem>
            <ToggleGroupItem className="mr-2" value="graphic" onClick={handleGraphicToggle} aria-label="Toggle bold" active={graphicSelected}>
            Graphic
            </ToggleGroupItem>
            <ToggleGroupItem value="marketing" onClick={handleMarketingToggle} aria-label="Toggle bold" active={marketingSelected}>
            Marketing
            </ToggleGroupItem>
        </div>

        <div className="gap-2 justify-start">
            <ToggleGroupItem className="mr-2" value="translation" onClick={handleTranslationToggle} aria-label="Toggle bold" active={translationSelected}>
            Translation
            </ToggleGroupItem>
            <ToggleGroupItem value="consultant" onClick={handleConsultantToggle} aria-label="Toggle bold" active={consultantSelected}>
            Consultant
            </ToggleGroupItem>
        </div>

        <div className="gap-2 justify-start">
            <ToggleGroupItem value="programmingAndTech" onClick={handleProgrammingAndTechToggle} aria-label="Toggle bold" active={programmingAndTechSelected}>
            Programming and Tech
            </ToggleGroupItem>
        </div>

        <div className="gap-2 justify-start">
            <ToggleGroupItem className="mr-2" value="imagesAndSound" onClick={handleImagesAndSoundToggle} aria-label="Toggle bold" active={imagesAndSoundSelected}>
            Images and Sound
            </ToggleGroupItem>
            <ToggleGroupItem value="management" onClick={handleManagementToggle} aria-label="Toggle bold" active={managementSelected}>
            Management
            </ToggleGroupItem>
        </div>
      </ToggleGroup>

      {/* <ToggleGroup size={"sm"} type="single" className="gap-2 mt-2 justify-start">
        <ToggleGroupItem value="translation" onClick={handleTranslationToggle} aria-label="Toggle bold" active={translationSelected}>
          Translation
        </ToggleGroupItem>
        <ToggleGroupItem value="consultant" onClick={handleConsultantToggle} aria-label="Toggle bold" active={consultantSelected}>
          Consultant
        </ToggleGroupItem>
      </ToggleGroup>

      <ToggleGroup size={"sm"} type="single" className="gap-2 mt-2 justify-start">
        <ToggleGroupItem value="programmingAndTech" onClick={handleProgrammingAndTechToggle} aria-label="Toggle bold" active={programmingAndTechSelected}>
          Programming and Tech
        </ToggleGroupItem>
      </ToggleGroup> */}

      {/* <ToggleGroup size={"sm"} type="single" className="gap-2 mt-2 justify-start">
        <ToggleGroupItem value="imagesAndSound" onClick={handleImagesAndSoundToggle} aria-label="Toggle bold" active={imagesAndSoundSelected}>
          Images and Sound
        </ToggleGroupItem>
        <ToggleGroupItem value="management" onClick={handleManagementToggle} aria-label="Toggle bold" active={managementSelected}>
          Management
        </ToggleGroupItem>
      </ToggleGroup> */}
    </div>
  );
}
