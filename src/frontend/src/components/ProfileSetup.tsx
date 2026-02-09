import { useState } from 'react';
import { useSaveCallerUserProfile } from '../hooks/useQueries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import { Loader2, AlertCircle } from 'lucide-react';

export function ProfileSetup() {
  const [name, setName] = useState('');
  const saveProfile = useSaveCallerUserProfile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      await saveProfile.mutateAsync({ name: name.trim() });
    } catch (error) {
      // Error is already handled by the mutation
      console.error('Profile setup error:', error);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Welcome!</CardTitle>
        <CardDescription>Please tell us your name to get started.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={saveProfile.isPending}
            />
          </div>

          {saveProfile.isError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {saveProfile.error instanceof Error
                  ? saveProfile.error.message
                  : 'Failed to save your profile. Please try again.'}
              </AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full" disabled={saveProfile.isPending || !name.trim()}>
            {saveProfile.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Continue
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
