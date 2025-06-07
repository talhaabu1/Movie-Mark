'use client';

import React from 'react';
import { ScrollArea, ScrollBar } from './ui/scroll-area';
import { Card, CardContent } from './ui/card';
import { useQuery } from '@tanstack/react-query';
import { profileGet } from '@/lib/api/profile';
import { Separator } from './indie/separator';
import { Skeleton } from './ui/skeleton';
import { cn, getStatusColor } from '@/lib/utils';

type StatusItem = {
  name: string;
  total: number;
};

type StatusReportResponse = {
  movie: StatusItem[];
  series: StatusItem[];
};
const StatusReport = () => {
  const { data, isLoading } = useQuery<StatusReportResponse>({
    queryKey: ['profile'],
    queryFn: () => profileGet(),
    refetchOnWindowFocus: true,
  });

  return (
    <>
      <div>
        <h1>Movie</h1>
        <ScrollArea className="w-full pb-4 mt-1">
          <div className="flex gap-2.5">
            {isLoading
              ? [...Array(5)].map((_, i) => (
                  <Skeleton
                    className="min-w-[200px] h-[104px] rounded-lg"
                    key={i}
                  />
                ))
              : data?.movie.map(({ name, total }, i) => (
                  <Card className="min-w-[200px]" key={i}>
                    <CardContent
                      className={cn(
                        getStatusColor(name),
                        'flex flex-col items-center gap-y-1.5'
                      )}>
                      <span>{total}</span>
                      <p>{name}</p>
                    </CardContent>
                  </Card>
                ))}
          </div>
          <ScrollBar orientation="horizontal" className="mt-2" />
        </ScrollArea>
      </div>
      <div className=" mt-3">
        <h1>Series</h1>
        <ScrollArea className="w-full pb-4 mt-1">
          <div className="flex gap-2.5">
            {isLoading
              ? [...Array(5)].map((_, i) => (
                  <Skeleton
                    className="min-w-[200px] h-[104px] rounded-lg"
                    key={i}
                  />
                ))
              : data?.series.map(({ name, total }, i) => (
                  <Card className="min-w-[200px]" key={i}>
                    <CardContent
                      className={cn(
                        getStatusColor(name),
                        'flex flex-col items-center gap-y-1.5'
                      )}>
                      <span>{total}</span>
                      <p>{name}</p>
                    </CardContent>
                  </Card>
                ))}
          </div>
          <ScrollBar orientation="horizontal" className="mt-2" />
        </ScrollArea>
      </div>
    </>
  );
};

export default StatusReport;
