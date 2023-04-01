import { Box, Center } from '@chakra-ui/react';
import { components, Props, Select } from 'chakra-react-select';
import { useEffect } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import { FormValues, token } from './ProjectDonationSimulator';

type ControlledSelectProps = UseControllerProps<FormValues> &
  Props & {
    label: string;
  };

const customComponents = {
  Option: ({ children, ...props }: { children: any; props: any }) => (
    // @ts-ignore
    <components.Option {...props}>
      <Box
        w="full"
        fontWeight={'700'}
        m="0"
        display="flex"
        alignItems="center"
        justifyContent={'center'}
        textColor={'white'}
      >
        <Center w="20px" height="20px" mr="5px">
          {/* @ts-ignore */}
          {props?.data?.icon}
        </Center>
        {children}
      </Box>
    </components.Option>
  ),
  SingleValue: ({ children, ...props }: { children: any; props: any }) => (
    // @ts-ignore
    <components.SingleValue {...props}>
      <Box
        w="100%"
        fontWeight={'700'}
        m="0"
        display="flex"
        alignItems="center"
        justifyContent={'center'}
        textColor={'white'}
      >
        <Center w="20px" height="20px" mr="5px">
          {/* @ts-ignore */}
          {props?.data?.icon}
        </Center>
        {children}
      </Box>
    </components.SingleValue>
  ),
};
export const ControlledSelect = ({
  control,
  name,
  rules,
  ...props
}: ControlledSelectProps) => {
  const {
    field: { onChange, onBlur, value, ref },
  } = useController<FormValues>({
    name,
    control,
    rules,
    defaultValue: token[0].value,
  });

  useEffect(() => {
    onChange(token[0].value);
  }, []);

  return (
    <Select
      useBasicStyles
      name={name}
      ref={ref}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      selectedOptionColorScheme="purple"
      // @ts-ignore
      components={customComponents}
      placeholder="Token"
      colorScheme="none"
      chakraStyles={{
        container: (provided) => ({
          ...provided,
          w: '130px !important',
          m: '0',
          paddingEnd: '0 !important',
          backgroundColor: '#001F1B !important',
          border: '1px solid #E0FFFD16',
          rounded: '8px',
          _placeholder: { fontSize: 'md', pl: '20px' },
        }),
        singleValue: (provided) => ({
          ...provided,
          color: '#fff',
          fontWeight: '600',
          backgroundColor: '#001F1B !important',
          background: '#001F1B !important',
        }),
        valueContainer: (provided, state) => ({
          ...provided,
          paddingStart: '10px',
          color: '#fff',
          fontWeight: '600',
          alignItems: 'end',
          textAlign: 'end',
          p: '0',
          //pl: '8px',
          w: '110px !important',
          display: 'flex',
          justifyContent: 'end',
        }),
        input: (provided) => ({
          ...provided,
          backgroundColor: 'transparent',
        }),
        indicatorsContainer: (provided) => ({
          ...provided,
          p: '0',
          w: '30px',
          transform: 'translateX(-4px)',
          outline: 'none',
          boxShadow: 'none',
        }),
        indicatorSeparator: (provided) => ({
          ...provided,
          display: 'none',
        }),
        inputContainer: (provided) => ({
          ...provided,
          backgroundColor: 'transparent',
          display: 'none',
        }),
        dropdownIndicator: (provided) => ({
          ...provided,
          p: 0,
          backgroundColor: 'transparent',
          marginEnd: '0px',
          color: 'white',
          border: 'none',
          outline: 'none',
          w: '30px !important',
        }),
        control: (provided, state) => ({
          ...provided,
          backgroundColor: 'transparent',
          borderBottomLeftRadius: state.menuIsOpen ? 0 : 'md',
          borderBottomRightRadius: state.menuIsOpen ? 0 : 'md',
          transitionDuration: 0,
          width: '100%',
          border: 'none',
          outline: 'none',
          boxShadow: 'none',
          rounded: '8px',
          _hover: {
            border: 'none',
            boxShadow: 'none',
            outline: 'none',
            borderRight: 'none',
          },
          _active: {
            border: 'none',
            boxShadow: 'none',
            outline: 'none',
            borderRight: 'none',
          },
          _focus: {
            border: 'none',
            boxShadow: 'none',
            outline: 'none',
            borderRight: 'none',
          },
        }),
        menu: (provided) => ({
          ...provided,
          my: 0,
          backgroundColor: '#001F1B',
          fontSize: 'sm',
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          shadow: `0 0 0 1px #242424`,
          borderWidth: '1px',
          borderRadius: '8px',
          borderColor: '#E0FFFD16',
          // set selected state
        }),
        menuList: (provided, state) => ({
          //...provided,
          backgroundColor: '#001F1B',
          borderWidth: '0px',
          borderBottomRadius: '8px',
        }),
      }}
      {...props}
    />
  );
};
