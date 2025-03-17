import Loader from "@/app/components/ui/loader";

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Loader size="lg" />
    </div>
  );
}
