import CaseStudies from './components/caseStudies';
import CaseStudy from './components/caseStudy';
import Lookbook from './components/lookbook';

export default [
	{
		path: '/',
		exact: true,
		component: Lookbook
	},
	{
		path: '/case-studies',
		component: CaseStudies
	},
	{
		path: '/case-study/:caseStudyId',
		component: CaseStudy
	},
	{
		path: '/lookbook',
		component: Lookbook,
		exact: true
	},
	{
		path: '/lookbook/:lookbookId',
		component: Lookbook,
	}
];
