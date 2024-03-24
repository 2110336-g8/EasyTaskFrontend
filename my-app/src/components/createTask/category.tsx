import { useState } from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface CategoriesProps {
    selectedCategory: string;
    handleCategoryToggle: (category: string) => void;
}

export function Categories({
    selectedCategory,
    handleCategoryToggle,
}: CategoriesProps) {
    return (
        <div>
            <ToggleGroup
                size={'sm'}
                type='single'
                className='gap-3 mt-2 justify-start flex-col'
            >
                <div className='justify-start flex space-x-3'>
                    <ToggleGroupItem
                        value='General'
                        onClick={() => handleCategoryToggle('General')}
                        aria-label='Toggle bold'
                        active={selectedCategory === 'General'}
                    >
                        General
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value='Graphic Design'
                        onClick={() => handleCategoryToggle('Graphic Design')}
                        aria-label='Toggle bold'
                        active={selectedCategory === 'Graphic Design'}
                    >
                        Graphic
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value='Marketing'
                        onClick={() => handleCategoryToggle('Marketing')}
                        aria-label='Toggle bold'
                        active={selectedCategory === 'Marketing'}
                    >
                        Marketing
                    </ToggleGroupItem>
                </div>

                <div className='justify-start flex space-x-3'>
                    <ToggleGroupItem
                        value='Translation'
                        onClick={() => handleCategoryToggle('Translation')}
                        aria-label='Toggle bold'
                        active={selectedCategory === 'Translation'}
                    >
                        Translation
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value='Consultant'
                        onClick={() => handleCategoryToggle('Consultant')}
                        aria-label='Toggle bold'
                        active={selectedCategory === 'Consultant'}
                    >
                        Consultant
                    </ToggleGroupItem>
                </div>

                <div className='gap-2 justify-start flex space-x-3'>
                    <ToggleGroupItem
                        value='Programming and Tech'
                        onClick={() =>
                            handleCategoryToggle('Programming and Tech')
                        }
                        aria-label='Toggle bold'
                        active={selectedCategory === 'Programming and Tech'}
                    >
                        Programming and Tech
                    </ToggleGroupItem>
                </div>

                <div className='justify-start flex space-x-3'>
                    <ToggleGroupItem
                        value='Images and Sound'
                        onClick={() => handleCategoryToggle('Images and Sound')}
                        aria-label='Toggle bold'
                        active={selectedCategory === 'Images and Sound'}
                    >
                        Images and Sound
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value='Management'
                        onClick={() => handleCategoryToggle('Management')}
                        aria-label='Toggle bold'
                        active={selectedCategory === 'Management'}
                    >
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
