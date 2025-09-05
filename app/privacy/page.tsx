// app/legal/privacy/page.tsx
export default function PrivacyPage() {
    return (
        <main className="flex flex-col px-4 py-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

            <p className="mb-4"><strong>Effective Date:</strong> 4th September 2025</p>

            <p className="mb-4">
                SquashPix respects your privacy. Here’s how we handle data when you use our service.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">1. Image Privacy</h2>
            <ul className="list-disc pl-6 mb-4">
                <li>All image processing happens locally in your browser.</li>
                <li>SquashPix does not upload, store, or retain your images.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-4 mb-2">2. Technical Data</h2>
            <ul className="list-disc pl-6 mb-4">
                <li>We may collect anonymous browser/device info to improve the site.</li>
                <li>No personally identifiable information is collected unless you voluntarily provide it.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-4 mb-2">3. Cookies & Third Parties</h2>
            <ul className="list-disc pl-6 mb-4">
                <li>Cookies may be used if ads or third-party tools are present.</li>
                <li>Third parties may collect data according to their own policies.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-4 mb-2">4. External Links</h2>
            <p>We are not responsible for content or privacy practices on sites linked from SquashPix.</p>

            <h2 className="text-xl font-semibold mt-4 mb-2">5. Updates</h2>
            <p>This policy may be updated occasionally. Changes will be reflected on this page.</p>
        </main>
    );
}
