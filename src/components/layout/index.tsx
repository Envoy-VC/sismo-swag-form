import React from 'react';
import { AntDesignConfigProvider, NotificationProvider } from '~/providers';
import { ThemeProvider } from 'next-themes';

import clsx from 'clsx';
import { Navbar, SEO } from '~/components/common';

// Font
import { Bebas_Neue } from 'next/font/google';
const bebas_neue = Bebas_Neue({ weight: '400', subsets: ['latin'] });

interface Props {
	children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
	return (
		<ThemeProvider attribute='class' enableSystem={false}>
			<AntDesignConfigProvider>
				<NotificationProvider>
					<div className={clsx(bebas_neue.className)}>
						<SEO />
						<Navbar />
						{children}
					</div>
				</NotificationProvider>
			</AntDesignConfigProvider>
		</ThemeProvider>
	);
};

export default Layout;
