export interface INavigationData {
  id: number;
  name: string;
  link?: string;
  image?: string;
  description?: string;
  children?: INavigationData[];
}

const navigationData: INavigationData[] = [
  {
    id: 1,
    name: 'Foundations',
    children: [
      { id: 11, name: 'Colors', link: '/foundations/colors' },
      { id: 12, name: 'Border Radius', link: '/foundations/border-radius' },
      { id: 13, name: 'Spacing', link: '/foundations/spacing' },
      { id: 14, name: 'Typography', link: '/foundations/typography' },
    ],
  },
  {
    id: 2,
    name: 'Components',
    children: [
      {
        id: 21,
        name: 'Data Display',
        children: [
          {
            id: 211,
            name: 'Tag',
            link: '/component/data-display/tag',
            description: '',
          },
        ],
      },
      {
        id: 22,
        name: 'Disclosure',
        children: [
          {
            id: 221,
            name: "Tabs",
            image:
              "https://imagedelivery.net/rWTckr21FEHs39XCNFz7Yw/84633e96-2577-40b8-ffec-19f3b2bc0e00/public",
            link: "/component/disclosure/tabs",
            description: "",
          },
          {
            id: 222,
            name: 'Accordion',
            link: '/component/disclosure/accordion',
            description: '',
          },
        ],
      },
      {
        id: 23,
        name: 'Feedback',
        children: [
          {
            id: 231,
            name: 'Alert',
            link: '/component/feedback/alert',
            description: '',
          },
          {
            id: 132, // Should this be 232?
            name: 'Toast',
            link: '/component/feedback/toast',
            description: '',
          },
        ],
      },
      {
        id: 24,
        name: 'Media & Icons',
        children: [
          {
            id: 241,
            name: 'Avatar',
            link: '/component/media/avatar',
            description: '',
          },
          {
            id: 242,
            name: 'Icons',
            link: '/component/media/icons',
            description: '',
          },
          {
            id: 243,
            name: 'Images',
            link: '/component/media/images',
            description: '',
          },
        ],
      },
      {
        id: 25,
        name: 'Overlay',
        children: [
          {
            id: 251,
            name: 'Avatar',
            link: '/component/overlay/avatar',
            description: '',
          },
          {
            id: 252,
            name: 'Icons',
            link: '/component/overlay/icons',
            description: '',
          },
          {
            id: 253,
            name: 'Images',
            link: '/component/overlay/images',
            description: '',
          },
        ],
      },
    ],
  },
];

export default navigationData;
