import { useState } from 'react';

interface ClaimResponse {
  error?: string;
  ok: boolean;
}

interface UseClaimReturn {
  claimRewardPoints: (
    curUserId: string,
    curPoints: number,
    pointsEarned: number,
    curBoosters: number,
    boosterStatus: boolean
  ) => Promise<void>;
  isLoading: boolean | null;
  error: string | null;
}

export const useClaim = (): UseClaimReturn => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean | null>(null);

  const claimRewardPoints = async (
    curUserId: string,
    curPoints: number,
    pointsEarned: number,
    curBoosters: number,
    boosterStatus: boolean
  ): Promise<void> => {
    setIsLoading(true);
    setError(null);

    const now = new Date();
    let deductBooster = 0;
    let finalPointsEarned = 0;

    if (boosterStatus) {
      deductBooster = 1;
      finalPointsEarned = pointsEarned * 2;
      console.log('Points Increment:', finalPointsEarned);
    } else {
      finalPointsEarned = pointsEarned;
    }

    const response = await fetch(`https://gooodjob.xyz/api/user/${curUserId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        points: curPoints + finalPointsEarned,
        boosters: curBoosters - deductBooster,
        lastClaim: now,
      }),
    });

    const json: ClaimResponse = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error || 'An error occurred');
    }

    if (response.ok) {
      setIsLoading(false);
    }
  };

  return { claimRewardPoints, isLoading, error };
};
