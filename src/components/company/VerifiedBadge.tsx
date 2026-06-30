import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface VerifiedBadgeProps {
  show?: boolean;
  size?: number;
}

export default function VerifiedBadge({ show, size = 16 }: VerifiedBadgeProps) {
  if (!show) return null;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          render={
            <span
              className="inline-flex items-center justify-center shrink-0 align-middle"
              style={{ width: size, height: size }}
            />
          }
        >
          <svg
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              width={size}
              height={size}
            >
              <circle cx="10" cy="10" r="10" fill="#1D9BF0" />
              <path
                d="M6 10.5L9 13.5L15 7"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
        </TooltipTrigger>
        <TooltipContent>
          <p>Perusahaan Premium</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
