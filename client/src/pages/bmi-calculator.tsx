import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";
import { Heart, Calculator, RotateCcw, User, Ruler, Weight, Info, AlertTriangle, Calendar } from "lucide-react";
import { bmiCalculationSchema, type BMICalculation } from "@shared/schema";

interface BMIResult {
  bmi: number;
  category: string;
  description: string;
  color: string;
}

export default function BMICalculator() {
  const [result, setResult] = useState<BMIResult | null>(null);

  const form = useForm<BMICalculation>({
    resolver: zodResolver(bmiCalculationSchema),
    defaultValues: {
      age: undefined,
      height: undefined,
      weight: undefined,
      heightUnit: "cm",
      weightUnit: "kg",
    },
  });

  const convertHeight = (value: number, unit: string): number => {
    if (unit === "ft") {
      return value * 0.3048; // feet to meters
    }
    return value / 100; // cm to meters
  };

  const convertWeight = (value: number, unit: string): number => {
    if (unit === "lbs") {
      return value * 0.453592; // pounds to kg
    }
    return value; // already in kg
  };

  const getBMICategory = (bmi: number): Omit<BMIResult, 'bmi'> => {
    if (bmi < 18.5) {
      return {
        category: "Underweight",
        description: "You may need to gain weight. Consider consulting a healthcare provider.",
        color: "text-blue-600",
      };
    } else if (bmi >= 18.5 && bmi < 25) {
      return {
        category: "Normal Weight",
        description: "You have a healthy body weight. Keep up the good work!",
        color: "text-green-600",
      };
    } else if (bmi >= 25 && bmi < 30) {
      return {
        category: "Overweight",
        description: "You may want to consider losing some weight for better health.",
        color: "text-yellow-600",
      };
    } else {
      return {
        category: "Obese",
        description: "Consider consulting a healthcare provider for a weight management plan.",
        color: "text-red-600",
      };
    }
  };

  const onSubmit = (data: BMICalculation) => {
    const heightInMeters = convertHeight(data.height, data.heightUnit);
    const weightInKg = convertWeight(data.weight, data.weightUnit);
    const bmi = weightInKg / (heightInMeters * heightInMeters);
    
    const categoryInfo = getBMICategory(bmi);
    
    setResult({
      bmi,
      ...categoryInfo,
    });
  };

  const resetForm = () => {
    form.reset();
    setResult(null);
  };

  // Watch form values for real-time calculation
  const watchedValues = form.watch();
  
  // Real-time calculation effect
  useEffect(() => {
    const { age, height, weight, heightUnit, weightUnit } = watchedValues;
    
    if (age && height && weight && 
        age >= 1 && age <= 120 && 
        height > 0 && weight > 0) {
      
      const heightInMeters = convertHeight(height, heightUnit);
      const weightInKg = convertWeight(weight, weightUnit);
      const bmi = weightInKg / (heightInMeters * heightInMeters);
      
      const categoryInfo = getBMICategory(bmi);
      
      setResult({
        bmi,
        ...categoryInfo,
      });
    }
  }, [watchedValues]);

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-8 relative">
          <div className="absolute top-0 right-0">
            <ThemeToggle />
          </div>
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">BMI Calculator</h1>
          <p className="text-muted-foreground text-lg">Calculate your Body Mass Index and assess your health status</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* BMI Form */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <User className="w-6 h-6 text-primary mr-3" />
                Your Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Age Input */}
                <div className="space-y-2">
                  <Label htmlFor="age" className="text-sm font-medium">Age (years)</Label>
                  <div className="relative">
                    <Input
                      id="age"
                      type="number"
                      placeholder="Enter your age"
                      {...form.register("age", { valueAsNumber: true })}
                      className="pr-10"
                    />
                    <Calendar className="absolute right-3 top-3 w-4 h-4 text-muted-foreground" />
                  </div>
                  {form.formState.errors.age && (
                    <p className="text-sm text-destructive flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      {form.formState.errors.age.message}
                    </p>
                  )}
                </div>

                {/* Height Input */}
                <div className="space-y-2">
                  <Label htmlFor="height" className="text-sm font-medium">Height</Label>
                  <div className="flex space-x-2">
                    <div className="relative flex-1">
                      <Input
                        id="height"
                        type="number"
                        step="0.1"
                        placeholder="Enter height"
                        {...form.register("height", { valueAsNumber: true })}
                        className="pr-10"
                      />
                      <Ruler className="absolute right-3 top-3 w-4 h-4 text-muted-foreground" />
                    </div>
                    <Select
                      value={form.watch("heightUnit")}
                      onValueChange={(value) => form.setValue("heightUnit", value as "cm" | "ft")}
                    >
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cm">cm</SelectItem>
                        <SelectItem value="ft">ft</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {form.formState.errors.height && (
                    <p className="text-sm text-destructive flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      {form.formState.errors.height.message}
                    </p>
                  )}
                </div>

                {/* Weight Input */}
                <div className="space-y-2">
                  <Label htmlFor="weight" className="text-sm font-medium">Weight</Label>
                  <div className="flex space-x-2">
                    <div className="relative flex-1">
                      <Input
                        id="weight"
                        type="number"
                        step="0.1"
                        placeholder="Enter weight"
                        {...form.register("weight", { valueAsNumber: true })}
                        className="pr-10"
                      />
                      <Weight className="absolute right-3 top-3 w-4 h-4 text-muted-foreground" />
                    </div>
                    <Select
                      value={form.watch("weightUnit")}
                      onValueChange={(value) => form.setValue("weightUnit", value as "kg" | "lbs")}
                    >
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kg">kg</SelectItem>
                        <SelectItem value="lbs">lbs</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {form.formState.errors.weight && (
                    <p className="text-sm text-destructive flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      {form.formState.errors.weight.message}
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-2">
                  <Button type="submit" className="flex-1">
                    <Calculator className="w-4 h-4 mr-2" />
                    Calculate BMI
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Results Section */}
          <div className="space-y-6">
            {/* BMI Result Card */}
            {result && (
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Calculator className="w-6 h-6 text-primary mr-3" />
                    Your BMI Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-primary to-blue-600 mb-4">
                      <span className="text-3xl font-bold text-white">{result.bmi.toFixed(1)}</span>
                    </div>
                    <div className={`text-xl font-semibold mb-2 ${result.color}`}>
                      {result.category}
                    </div>
                    <div className="text-muted-foreground">{result.description}</div>
                  </div>

                  <div className="bg-muted rounded-lg p-4">
                    <h3 className="font-semibold text-foreground mb-3">Health Assessment</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Your BMI:</span>
                        <span className="font-medium">{result.bmi.toFixed(1)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Category:</span>
                        <span className={`font-medium ${result.color}`}>{result.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Age:</span>
                        <span className="font-medium">{watchedValues.age} years</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* BMI Categories Reference */}
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Info className="w-6 h-6 text-primary mr-3" />
                  BMI Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <div className="w-4 h-4 bg-blue-500 rounded-full mr-4"></div>
                    <div className="flex-1">
                      <div className="font-medium text-foreground">Underweight</div>
                      <div className="text-sm text-muted-foreground">BMI less than 18.5</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <div className="w-4 h-4 bg-green-500 rounded-full mr-4"></div>
                    <div className="flex-1">
                      <div className="font-medium text-foreground">Normal Weight</div>
                      <div className="text-sm text-muted-foreground">BMI 18.5 - 24.9</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                    <div className="w-4 h-4 bg-yellow-500 rounded-full mr-4"></div>
                    <div className="flex-1">
                      <div className="font-medium text-foreground">Overweight</div>
                      <div className="text-sm text-muted-foreground">BMI 25.0 - 29.9</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 bg-red-50 dark:bg-red-950/20 rounded-lg">
                    <div className="w-4 h-4 bg-red-500 rounded-full mr-4"></div>
                    <div className="flex-1">
                      <div className="font-medium text-foreground">Obese</div>
                      <div className="text-sm text-muted-foreground">BMI 30.0 and above</div>
                    </div>
                  </div>
                </div>
                
                <Alert className="mt-6">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Disclaimer:</strong> BMI is a screening tool and not a diagnostic tool. 
                    Consult with a healthcare provider for a comprehensive health assessment.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
