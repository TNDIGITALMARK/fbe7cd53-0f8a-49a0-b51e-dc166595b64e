'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, ThumbsUp } from 'lucide-react';
import { Review } from '@/lib/mock-data';

interface ReviewComponentProps {
  review: Review;
  onHelpful?: (reviewId: string) => void;
}

export function ReviewComponent({ review, onHelpful }: ReviewComponentProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating
            ? 'fill-yellow-400 text-yellow-400'
            : 'fill-gray-200 text-gray-200'
        }`}
      />
    ));
  };

  return (
    <div className="border-b border-gray-200 pb-6 last:border-b-0">
      <div className="flex items-start space-x-4">
        <Avatar>
          <AvatarImage src={review.userAvatar} alt={review.userName} />
          <AvatarFallback>
            {review.userName.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h4 className="font-medium text-sm">{review.userName}</h4>
            {review.verified && (
              <Badge variant="secondary" className="text-xs h-5">
                Verified Purchase
              </Badge>
            )}
          </div>

          <div className="flex items-center space-x-2 mb-2">
            <div className="flex">{renderStars(review.rating)}</div>
            <span className="text-sm font-medium">{review.title}</span>
          </div>

          <p className="text-sm text-gray-600 mb-3">{review.content}</p>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{formatDate(review.createdAt)}</span>

            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-1 text-xs"
              onClick={() => onHelpful?.(review.id)}
            >
              <ThumbsUp className="h-3 w-3 mr-1" />
              Helpful ({review.helpful})
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}