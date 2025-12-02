
function ApprovalBanner() {
  return (
    <div className="bg-red-600 px-4 py-3 text-foreground">
      <p className="flex items-center justify-center text-white">
        Your account is currently under review. We will notify you once it has been approved.
      </p>
    </div>
  );
}

export default ApprovalBanner;
