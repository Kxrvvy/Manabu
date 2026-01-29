import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider";




export default function GenerateOptions({ options, onChange }) {
    const getFrontLengthValue = (category) => {
        if (category === "short") return 20;
        if (category === "medium") return 50;
        return 100;
    };

    const [frontLength, setFrontLength] = useState(getFrontLengthValue(options.frontLength));

    const getfrontLength = (value) => {
        if (value <= 20) return "short";
        if (value <= 50) return "medium";
        return "long";
    };

    const getBackLengthValue = (category) => {
        if (category === "short") return 50;
        if (category === "medium") return 100;
        return 200;
    };

    const [backLength, setBackLength] = useState(getBackLengthValue(options.backLength));

    const getBackLength = (value) => {
        if (value <= 50) return "short";
        if (value <= 100) return "medium";
        return "long";
    }



    const handleChange = (key, value) => {
        onChange({
            ...options,
            [key]: value
        });
    };

    const IncreaseAmount = () => {
        const newCount = options.count + 5;
        if (newCount <= 20) {
            handleChange('count', newCount);
        }
    };

    const DecreaseAmount = () => {
        const newCount = options.count - 5;
        if (newCount >= 5) {
            handleChange('count', newCount);
        }
    }


    return (
        <div className="optionsContainer animate-fade-in-up w-full max-w-500 mx-auto text-black" style={{ animationDelay: "0.3s" }}>
            {/* Step 3 Heading */}
            <div className="step3 flex items-center gap-3 mb-4">
                <div className="step3Heading w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                    3
                </div>
                <h3 className="font-bold text-xl">Customize Settings</h3>
            </div>

            <div className=" card-elevated rounded-2xl p-6 border border-border bg-secondary/30 ">
                <div className="GENERATE_SETTINGS flex items-center gap-2 mb-6" >
                    (LOGO)
                    <h3>Generate Settings</h3>
                </div>

                {/* Options */}
                <div className="OPTIONS_PANEL grid md:grid-cols-2 gap-6">
                    {/* Number of Flashcards */}
                    <div className="">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Number of Flashcards
                        </label>

                        <div className="flex items-center gap-3">
                            <button className="MINUS_BUTTON border rounded-lg p-1 cursor-pointer"
                                onClick={DecreaseAmount}
                                disabled={options.count <= 5}>
                                <Minus />
                            </button>

                            <div className="FLASHCARD_NUMBER flex-1 text-center py-2 px-4 bg-background/50 rounded-lg border border-border">
                                <span>{options.count}</span>
                                <span>cards</span>
                            </div>

                            <button className="PLUS_BUTTON border rounded-xl p-2 cursor-pointer"
                                onClick={IncreaseAmount}
                                disabled={options.count >= 20}>
                                <Plus />
                            </button>
                        </div>

                    </div>

                    {/* Difficulty */}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Difficulty Level
                        </label>

                        <Select value={options.difficulty}
                            onValueChange={(value) => handleChange('difficulty', value)}
                        >
                            <SelectTrigger className="w-full p-2 border border-gray-300 rounded-lg 
                        focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                        focus:outline-none transition-all">
                                <SelectValue placeholder="Select a fruit" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Difficulty</SelectLabel>
                                    <SelectItem value="easy">
                                        <div className="flex items-center gap-2">
                                            <div className="h-2 w-2 rounded-full bg-green-500" />
                                            Easy - Basic Recal
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="medium">
                                        <div className="flex items-center gap-2">
                                            <div className="h-2 w-2 rounded-full bg-orange-500" />
                                            Medium - Understanding
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="hard">
                                        <div className="flex items-center gap-2">
                                            <div className="h-2 w-2 rounded-full bg-red-500" />
                                            Hard - Application
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="mixed">
                                        <div className="flex items-center gap-2">
                                            <div className="h-2 w-2 rounded-full bg-purple-500" />
                                            Mixed - All Levels
                                        </div>
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>


                    </div>

                    {/* Front Text Length */}
                    <div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">Front text length (Question)</label>
                            <span>{frontLength} words max </span>
                        </div>

                        <Slider value={[frontLength]}
                            onValueChange={(value) => {
                                const newValue = value[0];
                                setFrontLength(newValue);
                                handleChange('frontLength', getfrontLength(newValue));
                            }}
                            min={10}
                            max={100}
                            step={10}
                            className="py-2"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Short</span>
                            <span>Long</span>
                        </div>
                    </div>

                    {/* Back Text Length */}
                    <div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">Front text length (Question)</label>
                            <span>{backLength} words max </span>
                        </div>

                        <Slider value={[backLength]}
                            onValueChange={(value) => {
                                const newValue = value[0];
                                setBackLength(newValue);
                                handleChange('backLength', getBackLength(newValue));
                            }}
                            min={30}
                            max={200}
                            step={10}
                            className="py-2"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Short</span>
                            <span>Long</span>
                        </div>  
                    </div>
                </div>
            </div>
        </div>

    );
}