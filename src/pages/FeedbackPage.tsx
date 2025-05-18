
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockTollGates, Feedback, feedbackStore } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const FeedbackPage: React.FC = () => {
  const { toast } = useToast();
  const [tollGateId, setTollGateId] = useState('');
  const [rating, setRating] = useState<1 | 2 | 3 | 4 | 5>(5);
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!tollGateId || !comment || !name || !email) {
      toast({
        title: "Incomplete Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newFeedback: Feedback = {
        id: `feedback-${Date.now()}`,
        customerId: '1', // In a real app, this would be the logged-in user's ID
        tollGateId,
        rating,
        comment,
        submitDate: new Date().toISOString(),
        isResolved: false
      };
      
      feedbackStore.add(newFeedback);
      
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast({
        title: "Thank You!",
        description: "Your feedback has been submitted successfully",
      });
      
      // Reset form
      setTollGateId('');
      setRating(5);
      setComment('');
      setName('');
      setEmail('');
    }, 1000);
  };

  const handleReset = () => {
    setIsSubmitted(false);
  };

  return (
    <div className="py-8">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Submit Feedback</h1>
          <p className="text-lg text-gray-600 mt-2">
            Help us improve our services by sharing your experience
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="bg-tollTeal-50">
              <CardTitle className="text-tollTeal-800">Feedback Form</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Thank You for Your Feedback!</h3>
                  <p className="text-gray-600 mb-6">
                    We appreciate you taking the time to share your thoughts with us.
                  </p>
                  <Button onClick={handleReset}>Submit Another Feedback</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="toll-gate">Select Toll Gate</Label>
                      <Select
                        value={tollGateId}
                        onValueChange={setTollGateId}
                      >
                        <SelectTrigger id="toll-gate" className="w-full">
                          <SelectValue placeholder="Select a toll gate" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockTollGates.map(gate => (
                            <SelectItem key={gate.id} value={gate.id}>
                              {gate.name} - {gate.location.city}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="rating">Rating</Label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((value) => (
                          <Button
                            key={value}
                            type="button"
                            variant={rating === value ? "default" : "outline"}
                            className={`flex-1 ${
                              rating === value ? "bg-tollBlue-500 text-white" : ""
                            }`}
                            onClick={() => setRating(value as 1 | 2 | 3 | 4 | 5)}
                          >
                            {value}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="comment">Your Feedback</Label>
                      <Textarea 
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Please share your experience..."
                        rows={4}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input 
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Your Email</Label>
                      <Input 
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <Button 
                      type="submit" 
                      className="w-full bg-tollTeal-500 hover:bg-tollTeal-600" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
