// app/legal/terms/page.tsx
export default function TermsPage() {
    return (
        <main className="flex flex-col max-w-3xl mx-auto text-left px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>

            <p className="mb-4"><strong>Effective Date:</strong> 4th September 2025</p>

            <p className="mb-4">
                Welcome to <strong>SquashPix</strong>. By using this website, you agree to the terms below.
                If you do not agree, please stop using the site.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">1. Service Overview</h2>
            <ul className="list-disc pl-6 mb-4">
                <li>SquashPix is a free browser-based tool for compressing and converting images.</li>
                <li>No account or registration is required.</li>
                <li>You are responsible for ensuring you have the rights to use any images you process.</li>
                <li>The service is provided “as is” without guarantees of uptime or accuracy.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-4 mb-2">2. Image Handling</h2>
            <ul className="list-disc pl-6 mb-4">
                <li>All processing happens in your browser; nothing is uploaded or stored.</li>
                <li>You retain full ownership of any content you process.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-4 mb-2">3. Liability</h2>
            <ul className="list-disc pl-6 mb-4">
                <li>SquashPix is provided “as is” with no warranties.</li>
                <li>We are not responsible for any data loss, file corruption, or other issues.</li>
                <li>Use is entirely at your own risk.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-4 mb-2">4. Updates</h2>
            <p>These terms may change. Continued use of SquashPix after updates indicates acceptance.</p>
        </main>
    );
}
