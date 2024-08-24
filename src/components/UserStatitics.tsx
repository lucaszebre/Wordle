import React from 'react';
import { useQuery } from '@tanstack/react-query';

const fetchUserStats = async () => {
  const response = await fetch('/api/recordgame');
  if (!response.ok) {
    throw new Error('Failed to fetch user statistics');
  }
  return response.json();
};

const StatBox = ({ value, label }:any) => (
  <div className="flex flex-col items-center">
    <span className="text-4xl font-bold text-white">{value}</span>
    <span className="text-sm text-gray-300">{label}</span>
  </div>
);

const UserStatistics = () => {
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['userStats'],
    queryFn: fetchUserStats,
  });

  if (isLoading) return <div className="text-white">Loading statistics...</div>;
  if (error) return <div className="text-red-500">Error loading statistics</div>;

  const winPercentage = stats.gamesPlayed > 0
    ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100)
    : 0;

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h2 className="text-white text-xl font-bold mb-4 text-center">STATISTICS</h2>
      <div className="flex justify-between">
        <StatBox value={stats.gamesPlayed} label="Played" />
        <StatBox value={`${winPercentage}%`} label="Win %" />
        <StatBox value={stats.currentStreak} label="Current Streak" />
        <StatBox value={stats.maxStreak} label="Max Streak" />
      </div>
    </div>
  );
};

export default UserStatistics;