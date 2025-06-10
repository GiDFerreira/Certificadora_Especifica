import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

interface VideoCarouselProps {
  videoIds: string[];
}

export function VideoCarousel({ videoIds }: VideoCarouselProps) {
  return (
    <Carousel className="w-[80%] md:w-[85%] lg:w-[90%]">
      <CarouselContent>
        {videoIds.map((id, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <Card className="shadow-none bg-transparent border-none p-0">
              <CardContent>
                <iframe
                  src={`https://www.youtube.com/embed/${id}`}
                  title={`Vídeo ${index + 1}`}
                   className="w-full max-w-[300px] aspect-video rounded-md mx-auto"
                  allowFullScreen
                />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
