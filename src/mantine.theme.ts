import { createTheme } from '@mantine/core';
import activeClasses from '@styles/active.module.css';

export const mantineTheme = createTheme({
	fontFamily: 'Roboto',

	defaultRadius: 'md',
	cursorType: 'pointer',
	colors: {
		'main': [
			'rgba(167, 190, 247, 1)',
			'rgba(147, 167, 217, 1)',
			'rgba(127, 144, 188, 1)',
			'rgba(107, 121, 158, 1)',
			'rgba(87, 98, 128, 1)',
			'rgba(73, 84, 113, 1)',
			'rgba(67, 76, 99, 1)',
			'rgba(58, 66, 86, 1)',
			'rgba(50, 57, 74, 1)',
			'rgba(41, 47, 61, 1)'
		],
		'auxiliaryMain': [
			'rgba(165, 187, 243, 1)',
			'rgba(145, 163, 213, 1)',
			'rgba(125, 140, 184, 1)',
			'rgba(105, 116, 155, 1)',
			'rgba(89, 100, 132, 1)',
			'rgba(63, 73, 97, 1)',
			'rgba(73, 84, 113, 1)',
			'rgba(54, 62, 83, 1)',
			'rgba(44, 51, 70, 1)',
			'rgba(35, 41, 57, 1)'
		]
	},
	primaryColor: 'main',
	activeClassName: activeClasses['active'] ?? '',
})