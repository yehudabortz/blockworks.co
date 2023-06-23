import "server-only"

import Link from 'next/link';

const NotFound = () => {
	return (
		<html lang="en" className="h-full">
			<body className="flex min-h-full flex-col font-sans antialiased [overflow-anchor:none]">
				<h1>Not found – 404</h1>
				<div>
					<Link href="/">Go back to Home</Link>
				</div>
			</body>
		</html>
	);
};

export default NotFound;
