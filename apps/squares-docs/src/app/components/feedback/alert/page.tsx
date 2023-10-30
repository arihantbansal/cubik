import React from 'react';
import CodeComponent from '@/app/home-page-components/code-component';
import PageHOC from '@/app/home-page-components/components/pageHOC';
import { Alert, AlertColors, AlertTypes, AlertVariants } from '@cubik/ui';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@cubik/ui';

const page = () => {
  const alertVariants: AlertVariants[] = [
    'Info',
    'Loading',
    'Success',
    'Warning',
    'Error',
  ];
  const alertTypes: AlertTypes[] = ['Inline', 'Text', 'Border'];
  const alertColors: AlertColors[] = [
    'Purple',
    'Red',
    'Green',
    'Blue',
    'Yellow',
  ];
  const alertSizes: Array<'small' | 'large'> = ['small', 'large'];

  return (
    <>
      <PageHOC
        pages={[
          { name: 'Component', href: '/component', current: false },
          { name: 'Alert', href: '/component/alert', current: true },
        ]}
        heading={'Alert'}
        description={
          'Use the alert component to display important messages to users.'
        }
      >
        {alertColors.map((color) => (
          <div key={color} className="mb-4 dark:text-white">
            <h2 className="mb-4 text-xl">Color: {color}</h2>
            <Accordion type='multiple'>
              {alertTypes.map((type, idx) => (
                <AccordionItem value={`${idx}`} key={type} className="mb-2">
                  <AccordionTrigger>Type: {type}</AccordionTrigger>
                  <AccordionContent>
                    <Accordion type='single'>
                      {alertVariants.map((variant) => (
                        <AccordionItem key={variant} value={variant}>
                          <AccordionTrigger>{variant}</AccordionTrigger>
                          <AccordionContent>
                            {alertSizes.map((size) => (
                              <div key={size} className="mb-6 grid gap-2">
                                <Alert
                                  size={size as any}
                                  color={color as any}
                                  title={`Sample Title ${variant}`}
                                  content={`This is a sample content (${size} size)`}
                                  type={type as any}
                                  variant={variant as any}
                                  buttonText={
                                    variant === 'Loading' ? 'Retry' : 'Click Me'
                                  }
                                />
                                <CodeComponent codeString={`
                              <Alert 
                              size='${size}'
                              color='${color}'
                              title="Sample Title ${variant}"
                              content="This is a sample content (${size} size)"
                              type='${type}'
                              variant='${variant}'
                              buttonText={
                                variant === 'Loading' ? 'Retry' : 'Click Me'
                              }
                              `} />
                              </div>
                            ))}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </PageHOC>
    </>
  );
};

export default page;
