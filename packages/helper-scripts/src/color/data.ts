export interface DataVariables {
  version: string;
  collections: Collection[];
  collections2: Collection[];
}

export interface Collection {
  name: Name;
  modes: Mode[];
}

export interface Mode {
  name: 'Dark' | 'Light' | 'Color' | any;
  variables: Variable[];
}

export interface Variable {
  name: string;
  type: string;
  isAlias: boolean;
  value: ValueClass | string;
}
export interface ValueClass {
  collection?: string;
  name: string;
}
export type Name =
  | 'Component ( Colors )'
  | 'Primitives ( Colors )'
  | 'Semantic ( Colors )';

export const data: DataVariables = {
  version: '1.0.4',
  collections: [
    {
      name: 'Component ( Colors )',
      modes: [
        {
          name: 'Color',
          variables: [
            {
              name: 'Button/Primary/Surface/button-primary-surface-default',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-primary-inverse',
              },
            },
            {
              name: 'Button/Primary/Surface/button-primary-surface-hovered',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-hovered',
              },
            },
            {
              name: 'Button/Primary/Surface/button-primary-surface-focused',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-primary-inverse',
              },
            },
            {
              name: 'Button/Primary/Surface/button-primary-surface-disabled',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-muted',
              },
            },
            {
              name: 'Button/Primary/Text/button-primary-text-default',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-inverse',
              },
            },
            {
              name: 'Button/Primary/Text/button-primary-text-hovered',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-primary',
              },
            },
            {
              name: 'Button/Primary/Text/button-primary-text-focused',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-inverse',
              },
            },
            {
              name: 'Button/Primary/Text/button-primary-text-disabled',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-muted',
              },
            },
            {
              name: 'Button/Secondary/Surface/button-secondary-surface-default',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-hovered',
              },
            },
            {
              name: 'Button/Secondary/Surface/button-secondary-surface-hovered',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Background/color-bg-overlay',
              },
            },
            {
              name: 'Button/Secondary/Surface/button-secondary-surface-focused',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-hovered',
              },
            },
            {
              name: 'Button/Secondary/Surface/button-secondary-surface-disabled',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Background/color-bg-overlay',
              },
            },
            {
              name: 'Button/Tertiary/Surface/button-tertiary-surface-default',
              type: 'color',
              isAlias: false,
              value: '#00000000',
            },
            {
              name: 'Button/Tertiary/Surface/button-tertiary-surface-hovered',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-tertiary',
              },
            },
            {
              name: 'Button/Tertiary/Surface/button-tertiary-surface-focused',
              type: 'color',
              isAlias: false,
              value: '#00000003',
            },
            {
              name: 'Button/Tertiary/Surface/button-tertiary-surface-disabled',
              type: 'color',
              isAlias: false,
              value: '#00000000',
            },
            {
              name: 'Button/Secondary/Text/button-secondary-text-default',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-primary',
              },
            },
            {
              name: 'Button/Secondary/Text/button-secondary-text-hovered',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-primary',
              },
            },
            {
              name: 'Button/Secondary/Text/button-secondary-text-focused',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-primary',
              },
            },
            {
              name: 'Button/Secondary/Text/button-secondary-text-disabled',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-muted',
              },
            },
            {
              name: 'Button/Outline/Text/button-outline-text-default',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-primary',
              },
            },
            {
              name: 'Button/Outline/Text/button-outline-text-hovered',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-secondary',
              },
            },
            {
              name: 'Button/Outline/Text/button-outline-text-focused',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-primary',
              },
            },
            {
              name: 'Button/Outline/Text/button-outline-text-disabled',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-muted',
              },
            },
            {
              name: 'Button/Tertiary/Text/button-tertiary-text-default',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-primary',
              },
            },
            {
              name: 'Button/Tertiary/Text/button-tertiary-text-hovered',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-primary',
              },
            },
            {
              name: 'Button/Tertiary/Text/button-tertiary-text-focused',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-primary',
              },
            },
            {
              name: 'Button/Tertiary/Text/button-tertiary-text-disabled',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-muted',
              },
            },
            {
              name: 'Button/Primary/Border/button-primary-border-focused',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Blue/blue-500',
              },
            },
            {
              name: 'Button/Secondary/Border/button-secondary-border-focused',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Blue/blue-500',
              },
            },
            {
              name: 'Button/Outline/Border/button-outline-border-default',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Border/color-border-primary',
              },
            },
            {
              name: 'Button/Secondary/Surface/button-secondary-outline-default',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF00',
            },
            {
              name: 'Button/Secondary/Surface/button-outline-surface-hovered',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF00',
            },
            {
              name: 'Button/Outline/Border/button-outline-border-hovered',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-primary',
              },
            },
            {
              name: 'Button/Secondary/Surface/button-outline-surface-focused',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF03',
            },
            {
              name: 'Button/Secondary/Surface/button-outline-surface-disabled',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF00',
            },
            {
              name: 'Button/Outline/Border/button-outline-border-focused',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Background/color-bg-info',
              },
            },
            {
              name: 'Button/Outline/Border/button-outline-border-disabled',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Border/color-border-primary',
              },
            },
            {
              name: 'Button/Tertiary/Border/button-tertiary-border-focused',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Blue/blue-500',
              },
            },
            {
              name: 'Button/Link/Text/button-link-text-default',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-primary',
              },
            },
            {
              name: 'Button/Link/Text/button-link-text-hovered',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-tertiary',
              },
            },
            {
              name: 'Alert/Info/alert-info-surface',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-info',
              },
            },
            {
              name: 'Button/Link/Text/button-link-text-disabled',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-muted',
              },
            },
            {
              name: 'Alert/alert-cancel',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-700',
              },
            },
            {
              name: 'Alert/Info/alert-info-title',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-info',
              },
            },
            {
              name: 'Alert/Warning/alert-warning-surface',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-alert',
              },
            },
            {
              name: 'Alert/Warning/alert-warning-title',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-alert',
              },
            },
            {
              name: 'Alert/Info/alert-info-text',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-info-tertiary',
              },
            },
            {
              name: 'Alert/Warning/alert-warning-text',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-alert-tertiary',
              },
            },
            {
              name: 'Alert/Info/alert-info-icon-fill',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Component ( Colors )',
                name: 'Alert/Info/alert-info-title',
              },
            },
            {
              name: 'Alert/Warning/alert-warning-icon-fill',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Component ( Colors )',
                name: 'Alert/Warning/alert-warning-title',
              },
            },
            {
              name: 'Alert/Info/alert-info-border',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Component ( Colors )',
                name: 'Alert/Info/alert-info-title',
              },
            },
            {
              name: 'Alert/Info/alert-info-icon-stroke',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Component ( Colors )',
                name: 'Alert/Info/alert-info-surface',
              },
            },
            {
              name: 'Alert/Warning/alert-warning-icon-stroke',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Component ( Colors )',
                name: 'Alert/Warning/alert-warning-surface',
              },
            },
            {
              name: 'Alert/Warning/alert-warning-border',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Component ( Colors )',
                name: 'Alert/Warning/alert-warning-title',
              },
            },
            {
              name: 'Alert/Error/alert-error-surface',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-error',
              },
            },
            {
              name: 'Alert/Error/alert-error-title',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Background/color-bg-Error',
              },
            },
            {
              name: 'Alert/Error/alert-error-text',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-error-tertiary',
              },
            },
            {
              name: 'Alert/Error/alert-error-icon-fill',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Component ( Colors )',
                name: 'Alert/Error/alert-error-title',
              },
            },
            {
              name: 'Alert/Error/alert-error-icon-stroke',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Component ( Colors )',
                name: 'Alert/Error/alert-error-surface',
              },
            },
            {
              name: 'Alert/Success/alert-success-surface',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/colors-surface-success',
              },
            },
            {
              name: 'Alert/Error/alert-info-border',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Component ( Colors )',
                name: 'Alert/Error/alert-error-title',
              },
            },
            {
              name: 'Alert/Success/alert-success-title',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-success',
              },
            },
            {
              name: 'Alert/Success/alert-success-text',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/colors-surface-success-tertiary',
              },
            },
            {
              name: 'Alert/Success/alert-success-icon-fill',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Component ( Colors )',
                name: 'Alert/Success/alert-success-title',
              },
            },
            {
              name: 'Alert/Success/alert-success-icon-stroke',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Component ( Colors )',
                name: 'Alert/Success/alert-success-surface',
              },
            },
            {
              name: 'Alert/Success/alert-success-border',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Component ( Colors )',
                name: 'Alert/Success/alert-success-title',
              },
            },
            {
              name: 'Alert/Loading/alert-loading-surface',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-purple',
              },
            },
            {
              name: 'Alert/Loading/alert-loading-title',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Background/color-bg-purple',
              },
            },
            {
              name: 'Alert/Loading/alert-loading-text',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-purple-tertiary',
              },
            },
            {
              name: 'Alert/Loading/alert-loading-icon-fill',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Background/color-bg-purple',
              },
            },
            {
              name: 'Alert/Loading/alert-loading-icon-stroke',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Component ( Colors )',
                name: 'Alert/Loading/alert-loading-surface',
              },
            },
            {
              name: 'Alert/Loading/alert-loading-border',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Component ( Colors )',
                name: 'Alert/Loading/alert-loading-title',
              },
            },
            {
              name: 'Tag/Solid/Surface/tag-solid-surface-default',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-primary',
              },
            },
            {
              name: 'Tag/Solid/Surface/tag-solid-surface-green',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Background/color-bg-success',
              },
            },
            {
              name: 'Tag/Solid/Surface/tag-solid-surface-yellow',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Background/color-bg-alert',
              },
            },
            {
              name: 'Tag/Solid/Surface/tag-solid-surface-orange',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Background/color-bg-warning',
              },
            },
            {
              name: 'Tag/Solid/Surface/tag-solid-surface-red',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Background/color-bg-Error',
              },
            },
            {
              name: 'Tag/Solid/Surface/tag-solid-surface-blue',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Background/color-bg-info',
              },
            },
            {
              name: 'Tag/Solid/Surface/tag-solid-surface-purple',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Background/color-bg-purple',
              },
            },
            {
              name: 'Tag/Subtle/Surface/tag-subtle-surface-default',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Background/color-bg-secondary',
              },
            },
            {
              name: 'Tag/Subtle/Surface/tag-subtle-surface-green',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/colors-surface-success-secondary',
              },
            },
            {
              name: 'Tag/Subtle/Surface/tag-subtle-surface-yellow',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-alert-secondary',
              },
            },
            {
              name: 'Tag/Subtle/Surface/tag-subtle-surface-orange',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-warn-secondary',
              },
            },
            {
              name: 'Tag/Subtle/Surface/tag-subtle-surface-red',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-error-secondary',
              },
            },
            {
              name: 'Tag/Subtle/Surface/tag-subtle-surface-blue',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-info-secondary',
              },
            },
            {
              name: 'Tag/Subtle/Surface/tag-subtle-surface-purple',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-purple-secondary',
              },
            },
            {
              name: 'Tag/alert-cancel',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-700',
              },
            },
            {
              name: 'Navbar/navbar-surface',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-primary',
              },
            },
            {
              name: 'Navbar/navbar-fg-active',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-primary',
              },
            },
            {
              name: 'Navbar/navbar-fg-inactive',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-tertiary',
              },
            },
            {
              name: 'Typography/text-primary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-primary',
              },
            },
            {
              name: 'Typography/text-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-secondary',
              },
            },
            {
              name: 'Typography/text-tertiary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-tertiary',
              },
            },
            {
              name: 'Form/Input Field/Surface/form-input-surface-default',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-secondary',
              },
            },
            {
              name: 'Form/Color',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Form/Input Field/Surface/form-input-surface-hovered',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-secondary',
              },
            },
            {
              name: 'Form/Input Field/Surface/form-input-surface-focused',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-secondary',
              },
            },
            {
              name: 'Form/Input Field/Surface/form-input-surface-error',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-secondary',
              },
            },
            {
              name: 'Form/Input Field/Surface/form-input-surface-disabled',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-muted',
              },
            },
            {
              name: 'Form/Input Field/Foreground/form-input-fg-default',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-primary',
              },
            },
            {
              name: 'Form/Input Field/Foreground/form-input-fg-hovered',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-primary',
              },
            },
            {
              name: 'Form/Input Field/Foreground/form-input-fg-focused',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-primary',
              },
            },
            {
              name: 'Form/Input Field/Foreground/form-input-fg-error',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-primary',
              },
            },
            {
              name: 'Form/Input Field/Foreground/form-input-fg-disabled',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-muted',
              },
            },
            {
              name: 'Form/Helper Text/form-helper-default',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-tertiary',
              },
            },
            {
              name: 'Form/Helper Text/form-helper-success',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-success',
              },
            },
            {
              name: 'Form/Helper Text/form-helper-error',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-error',
              },
            },
            {
              name: 'Form/Helper Text/form-helper-warning',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-warning',
              },
            },
            {
              name: 'Form/Helper Text/form-helper-info',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Background/color-bg-info',
              },
            },
            {
              name: 'Form/Label/form-',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Form/Input Field/Placeholder/form-input-placholder-default',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Placeholder/color-placeholder-primary',
              },
            },
            {
              name: 'Form/Input Field/Placeholder/form-input-placeholder-hovered',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Placeholder/color-placeholder-primary',
              },
            },
            {
              name: 'Form/Input Field/Placeholder/form-input-placeholder-focused',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Placeholder/color-placeholder-primary',
              },
            },
            {
              name: 'Form/Input Field/Placeholder/form-input-placeholder-error',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Placeholder/color-placeholder-primary',
              },
            },
            {
              name: 'Form/Input Field/Placeholder/form-input-placeholder-disabled',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-muted',
              },
            },
            {
              name: 'Form/Input Field/Border/form-input-border-default',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Border/color-border-primary',
              },
            },
            {
              name: 'Form/Input Field/Border/form-input-border-hovered',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Border/color-border-hovered',
              },
            },
            {
              name: 'Form/Input Field/Border/form-input-border-focused',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Border/color-border-focus',
              },
            },
            {
              name: 'Form/Input Field/Border/form-input-border-error',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Border/color-border-error',
              },
            },
            {
              name: 'Form/Checkbox/Surface/form-checkbox-surface-default',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Component ( Colors )',
                name: 'Form/Input Field/Surface/form-input-surface-default',
              },
            },
            {
              name: 'Form/Input Field/Border/form-input-border-disabled',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Border/color-border-primary',
              },
            },
            {
              name: 'Form/Checkbox/Surface/form-checkbox-surface-default-checked',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Interactions/color-interaction-primary',
              },
            },
            {
              name: 'Form/Checkbox/Surface/form-checkbox-surface-hovered',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Border/color-border-secondary',
              },
            },
            {
              name: 'Form/Checkbox/Surface/form-checkbox-surface-hovered-checked',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Interactions/color-interaction-primary',
              },
            },
            {
              name: 'Form/Checkbox/Surface/form-checkbox-surface-focused',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF03',
            },
            {
              name: 'Form/Checkbox/Surface/form-checkbox-surface-focused-checked',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Interactions/color-interaction-primary',
              },
            },
            {
              name: 'Form/Checkbox/Surface/form-checkbox-surface-disabled',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Interactions/color-interaction-muted',
              },
            },
            {
              name: 'Form/Checkbox/Surface/form-checkbox-surface-disabled-checked',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Interactions/color-interaction-muted',
              },
            },
            {
              name: 'Form/Checkbox/Icon/form-checkbox-icon-default',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Background/color-bg-primary',
              },
            },
            {
              name: 'Form/Checkbox/Icon/form-checkbox-icon-hovered',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Background/color-bg-primary',
              },
            },
            {
              name: 'Form/Checkbox/Icon/form-checkbox-icon-focused',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Background/color-bg-primary',
              },
            },
            {
              name: 'Form/Checkbox/Icon/form-checkbox-icon-disabled',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Background/color-bg-inverse',
              },
            },
            {
              name: 'Form/Checkbox/Border/form-checkbox-border-default',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Component ( Colors )',
                name: 'Form/Input Field/Border/form-input-border-default',
              },
            },
            {
              name: 'Form/Checkbox/Border/form-checkbox-border-hovered',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Border/color-border-secondary',
              },
            },
            {
              name: 'Form/Checkbox/Border/form-checkbox-border-focused',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Border/color-border-primary',
              },
            },
            {
              name: 'Form/Checkbox/Border/form-checkbox-border-disabled',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Interactions/color-interaction-muted',
              },
            },
            {
              name: 'Form/Media Upload/Surface/form-uploader-surface-default',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF03',
            },
            {
              name: 'Form/Media Upload/Surface/form-uploader-surface-dropping',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-tertiary',
              },
            },
            {
              name: 'Form/Media Upload/Surface/form-uploader-surface-uploading',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-tertiary',
              },
            },
            {
              name: 'Form/Media Upload/Surface/form-checkbox-surface-success',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF03',
            },
            {
              name: 'Form/Media Upload/Surface/form-checkbox-surface-warning',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF03',
            },
            {
              name: 'Form/Media Upload/Surface/form-checkbox-surface-error',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF03',
            },
            {
              name: 'Form/Media Upload/Border/form-uploader-border-default',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Border/color-border-secondary',
              },
            },
            {
              name: 'Form/Media Upload/Border/form-uploader-border-dropping',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Border/color-border-secondary',
              },
            },
            {
              name: 'Form/Media Upload/Border/form-uploader-border-uploading',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Border/color-border-secondary',
              },
            },
            {
              name: 'Form/Media Upload/Border/form-uploader-border-success',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Border/color-border-secondary',
              },
            },
            {
              name: 'Form/Media Upload/Border/form-uploader-border-danger',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Border/color-border-secondary',
              },
            },
            {
              name: 'Form/Media Upload/Border/form-uploader-border-error',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Border/color-border-secondary',
              },
            },
            {
              name: 'Form/Media Upload/Icon/form-uploader-icon-default',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-info',
              },
            },
            {
              name: 'Form/Media Upload/Icon/form-uploader-icon-uploading',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-success',
              },
            },
            {
              name: 'Form/Media Upload/Icon/form-uploader-icon-dropping',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-success',
              },
            },
            {
              name: 'Form/Media Upload/Icon/form-uploader-icon-success',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-success',
              },
            },
            {
              name: 'Form/Media Upload/Icon/form-uploader-icon-warning',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-warning',
              },
            },
            {
              name: 'Form/Media Upload/Icon/form-uploader-icon-error',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-error',
              },
            },
            {
              name: 'Form/Media Upload/Image/form-uploader-img-default',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-tertiary',
              },
            },
            {
              name: 'Form/Media Upload/Image/form-uploader-img-dropping',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-hovered',
              },
            },
            {
              name: 'Form/Media Upload/Image/form-uploader-img-uploading',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-hovered',
              },
            },
            {
              name: 'Form/Media Upload/Image/form-uploader-img-success',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/colors-surface-success',
              },
            },
            {
              name: 'Form/Media Upload/Image/form-uploader-img-warning',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-warn',
              },
            },
            {
              name: 'Form/Media Upload/Image/form-uploader-img-error',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-warn',
              },
            },
            {
              name: 'Form/Media Upload/Link/form-uploader-link-default',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Interactions/color-interaction-primary',
              },
            },
            {
              name: 'Form/Media Upload/Link/form-uploader-link-dropping',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Interactions/color-interaction-primary',
              },
            },
            {
              name: 'Form/Media Upload/Link/form-uploader-link-uploading',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Interactions/color-interaction-primary',
              },
            },
            {
              name: 'Form/Media Upload/Link/form-uploader-link-success',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Interactions/color-interaction-primary',
              },
            },
            {
              name: 'Form/Media Upload/Link/form-uploader-link-warning',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Interactions/color-interaction-primary',
              },
            },
            {
              name: 'Form/Media Upload/Link/form-uploader-link-error',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Interactions/color-interaction-primary',
              },
            },
            {
              name: 'Form/Media Upload/Text/form-uploader-text-default',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-primary',
              },
            },
            {
              name: 'Form/Media Upload/Text/form-uploader-text-dropping',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-primary',
              },
            },
            {
              name: 'Form/Media Upload/Text/form-uploader-text-uploading',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-primary',
              },
            },
            {
              name: 'Form/Media Upload/Text/form-uploader-text-success',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-success',
              },
            },
            {
              name: 'Form/Media Upload/Text/form-uploader-text-warning',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-warning',
              },
            },
            {
              name: 'Form/Media Upload/Text/form-uploader-text-error',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-error',
              },
            },
            {
              name: 'Form/Toggle Switch/Surface/form-switch-surface-default-on',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Interactions/color-interaction-primary',
              },
            },
            {
              name: 'Form/Toggle Switch/Surface/form-switch-surface-default-off',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Border/color-border-secondary',
              },
            },
            {
              name: 'Form/Toggle Switch/Surface/form-switch-surface-focused-on',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Interactions/color-interaction-primary',
              },
            },
            {
              name: 'Form/Toggle Switch/Surface/form-switch-surface-focused-off',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-tertiary',
              },
            },
            {
              name: 'Form/Toggle Switch/Surface/form-switch-surface-disabled-on',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Interactions/color-interaction-primary',
              },
            },
            {
              name: 'Form/Toggle Switch/Surface/form-switch-surface-disabled-off',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-tertiary',
              },
            },
            {
              name: 'Form/Toggle Switch/Button/form-switch-button-default-on',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'White',
              },
            },
            {
              name: 'Form/Toggle Switch/Button/form-switch-button-default-off',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'White',
              },
            },
            {
              name: 'Form/Toggle Switch/Button/form-switch-button-focused-on',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'White',
              },
            },
            {
              name: 'Form/Toggle Switch/Button/form-switch-button-focused-off',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'White',
              },
            },
            {
              name: 'Form/Toggle Switch/Button/form-switch-button-disabled-on',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'White',
              },
            },
            {
              name: 'Form/Toggle Switch/Button/form-switch-button-disabled-off',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'White',
              },
            },
            {
              name: 'Form/Toggle Switch/Border/form-switch-border-default-on',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Background/color-bg-info',
              },
            },
            {
              name: 'Form/Toggle Switch/Border/form-switch-border-default-off',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Border/color-border-secondary',
              },
            },
            {
              name: 'Form/Toggle Switch/Border/form-switch-border-hovered-on',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Background/color-bg-info',
              },
            },
            {
              name: 'Form/Toggle Switch/Border/form-switch-border-hovered-off',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-tertiary',
              },
            },
            {
              name: 'Form/Toggle Switch/Border/form-switch-border-focused-on',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Background/color-bg-info',
              },
            },
            {
              name: 'Form/Toggle Switch/Border/form-switch-border-focused-off',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-tertiary',
              },
            },
            {
              name: 'Form/Toggle Switch/Border/form-switch-border-disabled-on',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Background/color-bg-info',
              },
            },
            {
              name: 'Form/Toggle Switch/Border/form-switch-border-disabled-off',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-tertiary',
              },
            },
            {
              name: 'Tag/Solid/Text/tag-solid-text-default',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Component ( Colors )',
                name: 'Sub Heads/subhead-fg-primary',
              },
            },
            {
              name: 'Tag/Solid/Text/tag-solid-text-green',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Black',
              },
            },
            {
              name: 'Tag/Solid/Text/tag-solid-text-yellow',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Black',
              },
            },
            {
              name: 'Tag/Solid/Text/tag-solid-text-orange',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Orange/orange-50',
              },
            },
            {
              name: 'Tag/Solid/Text/tag-solid-text-red',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Red/red-50',
              },
            },
            {
              name: 'Tag/Solid/Text/tag-solid-text-blue',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Blue/blue-50',
              },
            },
            {
              name: 'Tag/Solid/Icon/tag-solid-icon-default',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-900',
              },
            },
            {
              name: 'Tag/Solid/Text/tag-solid-text-purple',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'White',
              },
            },
            {
              name: 'Tag/Solid/Icon/tag-solid-icon-green',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-900',
              },
            },
            {
              name: 'Tag/Solid/Icon/tag-solid-icon-yellow',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-900',
              },
            },
            {
              name: 'Tag/Solid/Icon/tag-solid-icon-orange',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-900',
              },
            },
            {
              name: 'Tag/Solid/Icon/tag-solid-icon-red',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-900',
              },
            },
            {
              name: 'Tag/Solid/Icon/tag-solid-icon-blue',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-900',
              },
            },
            {
              name: 'Tag/Solid/Border/tag-solid-border-default',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-900',
              },
            },
            {
              name: 'Tag/Solid/Icon/tag-solid-icon-purple',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-900',
              },
            },
            {
              name: 'Tag/Solid/Border/tag-solid-border-green',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-900',
              },
            },
            {
              name: 'Tag/Solid/Border/tag-solid-border-yellow',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-900',
              },
            },
            {
              name: 'Tag/Solid/Border/tag-solid-border-orange',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-900',
              },
            },
            {
              name: 'Tag/Solid/Border/alert-solid-border-red',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-900',
              },
            },
            {
              name: 'Tag/Solid/Border/tag-solid-border-blue',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-900',
              },
            },
            {
              name: 'Tag/Solid/Border/alert-subtle-surface-purple',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-900',
              },
            },
            {
              name: 'Tag/Subtle/Text/tag-subtle-text-default',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Background/color-bg-inverse',
              },
            },
            {
              name: 'Tag/Subtle/Text/tag-subtle-text-green',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-success-secondary',
              },
            },
            {
              name: 'Tag/Subtle/Text/tag-subtle-text-yellow',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-alert-secondary',
              },
            },
            {
              name: 'Tag/Subtle/Text/tag-subtle-text-orange',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-warning-secondary',
              },
            },
            {
              name: 'Tag/Subtle/Text/tag-subtle-text-red',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-error-secondary',
              },
            },
            {
              name: 'Tag/Subtle/Text/tag-subtle-text-blue',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-info-secondary',
              },
            },
            {
              name: 'Tag/Subtle/Icon/tag-subtle-icon-default',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-900',
              },
            },
            {
              name: 'Tag/Subtle/Text/tag-subtle-text-purple',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-purple-secondary',
              },
            },
            {
              name: 'Tag/Subtle/Icon/tag-subtle-icon-green',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-900',
              },
            },
            {
              name: 'Tag/Subtle/Icon/tag-subtle-icon-yellow',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-900',
              },
            },
            {
              name: 'Tag/Subtle/Icon/tag-subtle-icon-orange',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-900',
              },
            },
            {
              name: 'Tag/Subtle/Icon/tag-subtle-icon-red',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-900',
              },
            },
            {
              name: 'Tag/Subtle/Icon/tag-subtle-icon-blue',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-900',
              },
            },
            {
              name: 'Tag/Subtle/Icon/tag-subtle-icon-purple',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-900',
              },
            },
            {
              name: 'Tag/Subtle/Border/tag-subtle-border-default',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-900',
              },
            },
            {
              name: 'Tag/Subtle/Border/tag-subtle-border-green',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-900',
              },
            },
            {
              name: 'Tag/Subtle/Border/tag-subtle-border-yellow',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-900',
              },
            },
            {
              name: 'Tag/Subtle/Border/tag-subtle-border-orange',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-900',
              },
            },
            {
              name: 'Tag/Subtle/Border/tag-subtle-border-red',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-900',
              },
            },
            {
              name: 'Tag/Subtle/Border/tag-subtle-border-blue',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-900',
              },
            },
            {
              name: 'Tag/Subtle/Border/tag-solid-border-purple',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-900',
              },
            },
            {
              name: 'Sub Heads/subhead-fg-primary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-primary',
              },
            },
            {
              name: 'Sub Heads/subhead-fg-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-secondary',
              },
            },
            {
              name: 'Sub Heads/subhead-fg-tertiary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-tertiary',
              },
            },
            {
              name: 'Tab/tab-fg-active',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-primary',
              },
            },
            {
              name: 'Tab/tab-fg-inactive',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-tertiary',
              },
            },
            {
              name: 'Tab/tab-surface-active',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-secondary',
              },
            },
            {
              name: 'Tab/tab-surface-inactive',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-overlay',
              },
            },
            {
              name: 'Tab/tab-border-active',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Component ( Colors )',
                name: 'Tab/tab-fg-active',
              },
            },
            {
              name: 'Tab/tab-border-inactive',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF00',
            },
            {
              name: 'Button/Danger/Surface/button-danger-surface-default',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Background/color-bg-Error',
              },
            },
            {
              name: 'Button/Danger/Surface/button-danger-surface-hovered',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Background/color-bg-Error',
              },
            },
            {
              name: 'Button/Danger/Surface/button-danger-surface-focused',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Background/color-bg-Error',
              },
            },
            {
              name: 'Button/Danger/Surface/button-danger-surface-disabled',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-error-secondary',
              },
            },
            {
              name: 'Button/Danger/Text/button-danger-text-default',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'White',
              },
            },
            {
              name: 'Button/Danger/Text/button-danger-text-hovered',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'White',
              },
            },
            {
              name: 'Button/Danger/Text/button-danger-text-focused',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'White',
              },
            },
            {
              name: 'Button/Danger/Text/button-danger-text-disabled',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-500',
              },
            },
            {
              name: 'Button/Danger/Border/button-danger-border-focused',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Red/red-500',
              },
            },
            {
              name: 'Button/Danger/Surface/button-danger-outline-default',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF00',
            },
            {
              name: 'Button/Danger/Surface/button-outline-surface-hovered',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF00',
            },
            {
              name: 'Button/Danger/Surface/button-outline-surface-focused',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF03',
            },
            {
              name: 'Button/Danger/Surface/button-outline-surface-disabled',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF00',
            },
            {
              name: 'Button/Success/Surface/button-success-surface-default',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Background/color-bg-success',
              },
            },
            {
              name: 'Button/Success/Surface/button-success-surface-hovered',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Background/color-bg-success',
              },
            },
            {
              name: 'Button/Success/Surface/button-success-surface-focused',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Background/color-bg-success',
              },
            },
            {
              name: 'Button/Success/Surface/button-success-surface-disabled',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-success-secondary',
              },
            },
            {
              name: 'Button/Success/Text/button-success-text-default',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Black',
              },
            },
            {
              name: 'Button/Success/Text/button-success-text-hovered',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Black',
              },
            },
            {
              name: 'Button/Success/Text/button-success-text-focused',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Black',
              },
            },
            {
              name: 'Button/Success/Text/button-success-text-disabled',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-400',
              },
            },
            {
              name: 'Button/Success/Border/button-success-border-focused',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Green/green-500',
              },
            },
            {
              name: 'Button/Success/Surface/button-success-outline-default',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF00',
            },
            {
              name: 'Button/Success/Surface/button-outline-surface-hovered',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF00',
            },
            {
              name: 'Button/Success/Surface/button-outline-surface-focused',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF03',
            },
            {
              name: 'Button/Success/Surface/button-outline-surface-disabled',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF00',
            },
            {
              name: 'Avatar/avatar-surface',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-tertiary',
              },
            },
            {
              name: 'Avatar/avatar-status',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Background/color-bg-primary',
              },
            },
            {
              name: 'Avatar/avatar-status-icon',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-info',
              },
            },
            {
              name: 'Avatar/avatar-group-surface-primary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-tertiary',
              },
            },
            {
              name: 'Avatar/avatar-group-surface-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-overlay',
              },
            },
            {
              name: 'Avatar/avatar-group-surface-tertiary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-muted',
              },
            },
            {
              name: 'Avatar/avatar-group-text',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-primary',
              },
            },
            {
              name: 'Avatar/avatar-label-title',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-primary',
              },
            },
            {
              name: 'Avatar/avatar-label-subtitle',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-tertiary',
              },
            },
            {
              name: 'Avatar/avatar-label-description',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-secondary',
              },
            },
            {
              name: 'Avatar/subhead-fg-tertiary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-tertiary',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'Semantic ( Colors )',
      modes: [
        {
          name: 'Dark',
          variables: [
            {
              name: 'Colors/Background/color-bg-primary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-980',
              },
            },
            {
              name: 'Colors/Background/color-bg-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-920',
              },
            },
            {
              name: 'Colors/Background/color-bg-tertiary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-900',
              },
            },
            {
              name: 'Colors/Surface/color-surface-primary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-880',
              },
            },
            {
              name: 'Colors/Background/color-bg-Error',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Red/red-500',
              },
            },
            {
              name: 'Colors/Surface/color-surface-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-850',
              },
            },
            {
              name: 'Colors/Surface/color-surface-tertiary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-800',
              },
            },
            {
              name: 'Colors/Background/color-bg-success',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Green/green-500',
              },
            },
            {
              name: 'Colors/Background/color-bg-alert',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Yellow/yellow-500',
              },
            },
            {
              name: 'Colors/Background/color-bg-warning',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Orange/orange-500',
              },
            },
            {
              name: 'Colors/Surface/color-surface-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-900',
              },
            },
            {
              name: 'Colors/Background/color-bg-info',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Blue/blue-500',
              },
            },
            {
              name: 'Colors/Surface/color-surface-error',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-800',
              },
            },
            {
              name: 'Colors/Surface/color-surface-error-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Red/900',
              },
            },
            {
              name: 'Colors/Surface/color-surface-error-tertiary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-500',
              },
            },
            {
              name: 'Colors/Background/color-bg-purple',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Purple/purple-400',
              },
            },
            {
              name: 'Colors/Background/color-bg-inverse',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-50',
              },
            },
            {
              name: 'Colors/Surface/color-surface-danger',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-800',
              },
            },
            {
              name: 'Colors/Surface/color-surface-danger-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Red/900',
              },
            },
            {
              name: 'Colors/Surface/color-surface-danger-tertiary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-500',
              },
            },
            {
              name: 'Colors/Surface/colors-surface-success',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-800',
              },
            },
            {
              name: 'Colors/Background/color-bg-overlay',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-700',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-primary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'White',
              },
            },
            {
              name: 'Colors/Surface/colors-surface-success-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Green/900',
              },
            },
            {
              name: 'Colors/Surface/colors-surface-success-tertiary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-500',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-300',
              },
            },
            {
              name: 'Colors/Surface/color-surface-warn',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-800',
              },
            },
            {
              name: 'Colors/Surface/color-surface-warn-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Orange/900',
              },
            },
            {
              name: 'Colors/Surface/color-surface-warn-tertiary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-500',
              },
            },
            {
              name: 'Colors/Surface/color-surface-alert',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-800',
              },
            },
            {
              name: 'Colors/Surface/color-surface-alert-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Yellow/900',
              },
            },
            {
              name: 'Colors/Surface/color-surface-alert-tertiary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-500',
              },
            },
            {
              name: 'Colors/Surface/color-surface-info',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-800',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-tertiary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-500',
              },
            },
            {
              name: 'Colors/Surface/color-surface-info-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Blue/900',
              },
            },
            {
              name: 'Colors/Surface/color-surface-info-tertiary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-500',
              },
            },
            {
              name: 'Colors/Surface/color-surface-info-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Blue/blue-700',
              },
            },
            {
              name: 'Colors/Surface/color-surface-purple',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-800',
              },
            },
            {
              name: 'Colors/Surface/color-surface-purple-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Purple/900',
              },
            },
            {
              name: 'Colors/Surface/color-surface-purple-tertiary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-500',
              },
            },
            {
              name: 'Colors/Surface/color-surface-hovered',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-800',
              },
            },
            {
              name: 'Colors/Surface/color-surface-overlay',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-900',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-error',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Red/red-500',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-error-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Red/red-400',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-success',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Green/green-600',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-success-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Green/green-400',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-warning',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Orange/orange-500',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-warning-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Orange/orange-400',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-alert',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Yellow/yellow-500',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-alert-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Yellow/yellow-400',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-info',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Blue/blue-500',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-info-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Blue/blue-400',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-purple',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Purple/purple-500',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-purple-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Purple/purple-400',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-800',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-inverse',
              type: 'color',
              isAlias: true,
              value: {
                name: 'Color/Neutral/neutral-950',
              },
            },
            {
              name: 'Colors/Foreground/colo-fg-overlay',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Foreground/colo-fg-green',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Green/green-50',
              },
            },
            {
              name: 'Colors/Foreground/colo-fg-blue',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Foreground/colo-fg-red',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Foreground/colo-fg-orange',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Foreground/colo-fg-purple',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Foreground/colo-fg-yellow',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Border/color-border-primary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-800',
              },
            },
            {
              name: 'Colors/Border/color-border-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-700',
              },
            },
            {
              name: 'Colors/Border/color-border-inverse',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-250',
              },
            },
            {
              name: 'Colors/Border/color-border-tertiary',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Border/color-border-focus',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-100',
              },
            },
            {
              name: 'Colors/Border/color-border-hovered',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-500',
              },
            },
            {
              name: 'Colors/Border/color-border-success',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Green/900',
              },
            },
            {
              name: 'Colors/Border/color-border-error',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Red/red-500',
              },
            },
            {
              name: 'Colors/Border/color-border-alert',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Yellow/900',
              },
            },
            {
              name: 'Colors/Border/color-border-warn',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Green/900',
              },
            },
            {
              name: 'Colors/Border/color-border-purple',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Purple/purple-700',
              },
            },
            {
              name: 'Colors/Border/color-border-divider',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-800',
              },
            },
            {
              name: 'Colors/Placeholder/color-placeholder-primary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-700',
              },
            },
            {
              name: 'Colors/Placeholder/color-placeholder-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-800',
              },
            },
            {
              name: 'Colors/Interactions/color-interaction-primary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Blue/blue-500',
              },
            },
            {
              name: 'Colors/Interactions/color-interaction-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Purple/purple-500',
              },
            },
            {
              name: 'Colors/Interactions/color-interaction-tertiary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Yellow/yellow-500',
              },
            },
            {
              name: 'Colors/Interactions/color-interaction-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-800',
              },
            },
            {
              name: 'Colors/Surface/color-surface-primary-inverse',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'White',
              },
            },
            {
              name: 'Colors/Indicators/color-feedback-success-light',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Indicators/Feedback/Success/color-feedback-success-base',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Indicators/Feedback/Success/color-feedback-success-tint',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Indicators/Feedback/Success/color-feedback-success-shade',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Indicators/Status/Activity/color-status-online',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Indicators/Status/Activity/color-status-ofline',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Indicators/Status/Activity/color-status-busy',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Indicators/Status/Activity/color-status-live',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Indicators/Status/Progress/color-status-upcoming',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Indicators/Status/Approval/color-status-approved',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Indicators/Status/Approval/color-status-rejected',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Indicators/Status/Approval/color-status-pending',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Indicators/Status/Progress/color-status-in_progress',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Indicators/Status/Progress/color-status-completed',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Indicators/Status/Progress/color-status-paused',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Indicators/Status/Progress/color-status-stopped',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Indicators/Status/Availability/color-status-available',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Indicators/Status/Availability/color-status-uinavailable',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Indicators/Status/Availability/color-status-limited',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Indicators/Status/Health/color-status-healthy',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Indicators/Status/Health/color-status-degraded',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Indicators/Status/Health/color-status-down',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Indicators/Feedback/Danger/color-feedback-danger-base',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Indicators/Feedback/Danger/color-feedback-danger-tint',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Indicators/Feedback/Danger/color-feedback-danger-shade',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Indicators/Feedback/Warning/color-feedback-warning-base',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Indicators/Feedback/Warning/color-feedback-warning-tint',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Indicators/Feedback/Warning/color-feedback-warning-shade',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Surface/Color',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
          ],
        },
        {
          name: 'Light',
          variables: [
            {
              name: 'Colors/Background/color-bg-primary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'White',
              },
            },
            {
              name: 'Colors/Background/color-bg-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-25',
              },
            },
            {
              name: 'Colors/Background/color-bg-tertiary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-50',
              },
            },
            {
              name: 'Colors/Surface/color-surface-primary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'White',
              },
            },
            {
              name: 'Colors/Background/color-bg-Error',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Red/red-500',
              },
            },
            {
              name: 'Colors/Surface/color-surface-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'White',
              },
            },
            {
              name: 'Colors/Surface/color-surface-tertiary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-75',
              },
            },
            {
              name: 'Colors/Background/color-bg-success',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Green/green-500',
              },
            },
            {
              name: 'Colors/Background/color-bg-alert',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Yellow/yellow-500',
              },
            },
            {
              name: 'Colors/Background/color-bg-warning',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Orange/orange-500',
              },
            },
            {
              name: 'Colors/Surface/color-surface-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-100',
              },
            },
            {
              name: 'Colors/Background/color-bg-info',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Blue/blue-500',
              },
            },
            {
              name: 'Colors/Surface/color-surface-error',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Red/red-50',
              },
            },
            {
              name: 'Colors/Surface/color-surface-error-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Red/red-50',
              },
            },
            {
              name: 'Colors/Surface/color-surface-error-tertiary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Red/red-500',
              },
            },
            {
              name: 'Colors/Background/color-bg-purple',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Purple/purple-400',
              },
            },
            {
              name: 'Colors/Background/color-bg-inverse',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-920',
              },
            },
            {
              name: 'Colors/Surface/color-surface-danger',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Red/red-50',
              },
            },
            {
              name: 'Colors/Surface/color-surface-danger-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Red/red-50',
              },
            },
            {
              name: 'Colors/Surface/color-surface-danger-tertiary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Red/red-500',
              },
            },
            {
              name: 'Colors/Surface/colors-surface-success',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Green/green-50',
              },
            },
            {
              name: 'Colors/Background/color-bg-overlay',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-150',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-primary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-950',
              },
            },
            {
              name: 'Colors/Surface/colors-surface-success-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Green/green-50',
              },
            },
            {
              name: 'Colors/Surface/colors-surface-success-tertiary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Green/green-500',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-700',
              },
            },
            {
              name: 'Colors/Surface/color-surface-warn',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Orange/orange-50',
              },
            },
            {
              name: 'Colors/Surface/color-surface-warn-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Orange/orange-50',
              },
            },
            {
              name: 'Colors/Surface/color-surface-warn-tertiary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Orange/orange-500',
              },
            },
            {
              name: 'Colors/Surface/color-surface-alert',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Yellow/yellow-50',
              },
            },
            {
              name: 'Colors/Surface/color-surface-alert-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Yellow/yellow-50',
              },
            },
            {
              name: 'Colors/Surface/color-surface-alert-tertiary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Yellow/yellow-600',
              },
            },
            {
              name: 'Colors/Surface/color-surface-info',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Blue/blue-50',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-tertiary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-400',
              },
            },
            {
              name: 'Colors/Surface/color-surface-info-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Blue/blue-50',
              },
            },
            {
              name: 'Colors/Surface/color-surface-info-tertiary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Blue/blue-500',
              },
            },
            {
              name: 'Colors/Surface/color-surface-info-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Blue/blue-700',
              },
            },
            {
              name: 'Colors/Surface/color-surface-purple',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Purple/purple-50',
              },
            },
            {
              name: 'Colors/Surface/color-surface-purple-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Purple/purple-50',
              },
            },
            {
              name: 'Colors/Surface/color-surface-purple-tertiary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Purple/purple-500',
              },
            },
            {
              name: 'Colors/Surface/color-surface-hovered',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-150',
              },
            },
            {
              name: 'Colors/Surface/color-surface-overlay',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-100',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-error',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Red/red-500',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-error-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Red/900',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-success',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Green/green-600',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-success-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Green/900',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-warning',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Orange/orange-500',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-warning-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Orange/900',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-alert',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Yellow/yellow-600',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-alert-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Yellow/900',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-info',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Blue/blue-500',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-info-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Blue/900',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-purple',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Purple/purple-500',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-purple-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Purple/900',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-250',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-inverse',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'White',
              },
            },
            {
              name: 'Colors/Foreground/colo-fg-overlay',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Foreground/colo-fg-green',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Green/green-50',
              },
            },
            {
              name: 'Colors/Foreground/colo-fg-blue',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Blue/blue-50',
              },
            },
            {
              name: 'Colors/Foreground/colo-fg-red',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Red/red-50',
              },
            },
            {
              name: 'Colors/Foreground/colo-fg-orange',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Orange/orange-50',
              },
            },
            {
              name: 'Colors/Foreground/colo-fg-purple',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Purple/purple-50',
              },
            },
            {
              name: 'Colors/Foreground/colo-fg-yellow',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Yellow/yellow-50',
              },
            },
            {
              name: 'Colors/Border/color-border-primary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-100',
              },
            },
            {
              name: 'Colors/Border/color-border-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-150',
              },
            },
            {
              name: 'Colors/Border/color-border-inverse',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-500',
              },
            },
            {
              name: 'Colors/Border/color-border-tertiary',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Border/color-border-focus',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Blue/blue-500',
              },
            },
            {
              name: 'Colors/Border/color-border-hovered',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Blue/blue-500',
              },
            },
            {
              name: 'Colors/Border/color-border-success',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Green/green-100',
              },
            },
            {
              name: 'Colors/Border/color-border-error',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Red/red-500',
              },
            },
            {
              name: 'Colors/Border/color-border-alert',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Yellow/yellow-800',
              },
            },
            {
              name: 'Colors/Border/color-border-warn',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Orange/orange-800',
              },
            },
            {
              name: 'Colors/Border/color-border-purple',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Purple/purple-800',
              },
            },
            {
              name: 'Colors/Border/color-border-divider',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-100',
              },
            },
            {
              name: 'Colors/Placeholder/color-placeholder-primary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-150',
              },
            },
            {
              name: 'Colors/Placeholder/color-placeholder-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-100',
              },
            },
            {
              name: 'Colors/Interactions/color-interaction-primary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Blue/blue-500',
              },
            },
            {
              name: 'Colors/Interactions/color-interaction-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Purple/purple-500',
              },
            },
            {
              name: 'Colors/Interactions/color-interaction-tertiary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Yellow/yellow-600',
              },
            },
            {
              name: 'Colors/Interactions/color-interaction-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-75',
              },
            },
            {
              name: 'Colors/Surface/color-surface-primary-inverse',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Black',
              },
            },
            {
              name: 'Colors/Indicators/color-feedback-success-light',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Indicators/Feedback/Success/color-feedback-success-base',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Indicators/Feedback/Success/color-feedback-success-tint',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Indicators/Feedback/Success/color-feedback-success-shade',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Indicators/Status/Activity/color-status-online',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Indicators/Status/Activity/color-status-ofline',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Indicators/Status/Activity/color-status-busy',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Indicators/Status/Activity/color-status-live',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Indicators/Status/Progress/color-status-upcoming',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Indicators/Status/Approval/color-status-approved',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Indicators/Status/Approval/color-status-rejected',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Indicators/Status/Approval/color-status-pending',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Indicators/Status/Progress/color-status-in_progress',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Indicators/Status/Progress/color-status-completed',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Indicators/Status/Progress/color-status-paused',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Indicators/Status/Progress/color-status-stopped',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Indicators/Status/Availability/color-status-available',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Indicators/Status/Availability/color-status-uinavailable',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Indicators/Status/Availability/color-status-limited',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Indicators/Status/Health/color-status-healthy',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Indicators/Status/Health/color-status-degraded',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Indicators/Status/Health/color-status-down',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Indicators/Feedback/Danger/color-feedback-danger-base',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Indicators/Feedback/Danger/color-feedback-danger-tint',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Indicators/Feedback/Danger/color-feedback-danger-shade',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Indicators/Feedback/Warning/color-feedback-warning-base',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Indicators/Feedback/Warning/color-feedback-warning-tint',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Indicators/Feedback/Warning/color-feedback-warning-shade',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Surface/Color',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
          ],
        },
      ],
    },
  ],
  collections2: [
    {
      name: 'Primitives ( Colors )',
      modes: [
        {
          name: 'Color',
          variables: [
            {
              name: 'Black',
              type: 'color',
              isAlias: false,
              value: '#050505',
            },
            {
              name: 'White',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Color/Grey/grey-50',
              type: 'color',
              isAlias: false,
              value: '#F7F7F8',
            },
            {
              name: 'Color/Grey/grey-100',
              type: 'color',
              isAlias: false,
              value: '#E8E8ED',
            },
            {
              name: 'Color/Grey/grey-200',
              type: 'color',
              isAlias: false,
              value: '#D1D1DB',
            },
            {
              name: 'Color/Grey/grey-300',
              type: 'color',
              isAlias: false,
              value: '#A9A9BC',
            },
            {
              name: 'Color/Grey/grey-400',
              type: 'color',
              isAlias: false,
              value: '#8A8AA3',
            },
            {
              name: 'Color/Grey/grey-500',
              type: 'color',
              isAlias: false,
              value: '#6C6C89',
            },
            {
              name: 'Color/Grey/grey-600',
              type: 'color',
              isAlias: false,
              value: '#55556D',
            },
            {
              name: 'Color/Grey/grey-700',
              type: 'color',
              isAlias: false,
              value: '#3F3F50',
            },
            {
              name: 'Color/Grey/grey-800',
              type: 'color',
              isAlias: false,
              value: '#282833',
            },
            {
              name: 'Color/Grey/grey-900',
              type: 'color',
              isAlias: false,
              value: '#121217',
            },
            {
              name: 'Color/Blue/blue-50',
              type: 'color',
              isAlias: false,
              value: '#F0F7FF',
            },
            {
              name: 'Color/Blue/blue-100',
              type: 'color',
              isAlias: false,
              value: '#DBECFF',
            },
            {
              name: 'Color/Blue/blue-200',
              type: 'color',
              isAlias: false,
              value: '#ADD5FF',
            },
            {
              name: 'Color/Blue/blue-300',
              type: 'color',
              isAlias: false,
              value: '#70B5FF',
            },
            {
              name: 'Color/Blue/blue-400',
              type: 'color',
              isAlias: false,
              value: '#3898FF',
            },
            {
              name: 'Color/Blue/blue-500',
              type: 'color',
              isAlias: false,
              value: '#007BFF',
            },
            {
              name: 'Color/Blue/blue-600',
              type: 'color',
              isAlias: false,
              value: '#0067D6',
            },
            {
              name: 'Color/Blue/blue-700',
              type: 'color',
              isAlias: false,
              value: '#0054AD',
            },
            {
              name: 'Color/Blue/blue-800',
              type: 'color',
              isAlias: false,
              value: '#004085',
            },
            {
              name: 'Color/Blue/blue-900',
              type: 'color',
              isAlias: false,
              value: '#002C5C',
            },
            {
              name: 'Color/Purple/purple-50',
              type: 'color',
              isAlias: false,
              value: '#EDEBF5',
            },
            {
              name: 'Color/Purple/purple-100',
              type: 'color',
              isAlias: false,
              value: '#D7CEF5',
            },
            {
              name: 'Color/Purple/purple-200',
              type: 'color',
              isAlias: false,
              value: '#C9BAF5',
            },
            {
              name: 'Color/Purple/purple-300',
              type: 'color',
              isAlias: false,
              value: '#B29DF5',
            },
            {
              name: 'Color/Purple/purple-400',
              type: 'color',
              isAlias: false,
              value: '#9D7FF5',
            },
            {
              name: 'Color/Purple/purple-500',
              type: 'color',
              isAlias: false,
              value: '#7F58F5',
            },
            {
              name: 'Color/Purple/purple-600',
              type: 'color',
              isAlias: false,
              value: '#5E39CC',
            },
            {
              name: 'Color/Purple/purple-700',
              type: 'color',
              isAlias: false,
              value: '#4121A3',
            },
            {
              name: 'Color/Purple/purple-800',
              type: 'color',
              isAlias: false,
              value: '#2B0D85',
            },
            {
              name: 'Color/Purple/purple-900',
              type: 'color',
              isAlias: false,
              value: '#1B065C',
            },
            {
              name: 'Color/Red/red-50',
              type: 'color',
              isAlias: false,
              value: '#FEF0F4',
            },
            {
              name: 'Color/Red/red-100',
              type: 'color',
              isAlias: false,
              value: '#FDD5DE',
            },
            {
              name: 'Color/Red/red-200',
              type: 'color',
              isAlias: false,
              value: '#FBB5C7',
            },
            {
              name: 'Color/Red/red-300',
              type: 'color',
              isAlias: false,
              value: '#F98BA6',
            },
            {
              name: 'Color/Red/red-400',
              type: 'color',
              isAlias: false,
              value: '#F76489',
            },
            {
              name: 'Color/Red/red-500',
              type: 'color',
              isAlias: false,
              value: '#F53D6B',
            },
            {
              name: 'Color/Red/red-600',
              type: 'color',
              isAlias: false,
              value: '#CC214C',
            },
            {
              name: 'Color/Red/red-700',
              type: 'color',
              isAlias: false,
              value: '#A31035',
            },
            {
              name: 'Color/Red/red-800',
              type: 'color',
              isAlias: false,
              value: '#850726',
            },
            {
              name: 'Color/Red/red-900',
              type: 'color',
              isAlias: false,
              value: '#5C0017',
            },
            {
              name: 'Color/Yellow/yellow-50',
              type: 'color',
              isAlias: false,
              value: '#FFFCEB',
            },
            {
              name: 'Color/Yellow/yellow-100',
              type: 'color',
              isAlias: false,
              value: '#FFF8D6',
            },
            {
              name: 'Color/Yellow/yellow-200',
              type: 'color',
              isAlias: false,
              value: '#FFF1AD',
            },
            {
              name: 'Color/Yellow/yellow-300',
              type: 'color',
              isAlias: false,
              value: '#FFEB85',
            },
            {
              name: 'Color/Yellow/yellow-400',
              type: 'color',
              isAlias: false,
              value: '#FFE45C',
            },
            {
              name: 'Color/Yellow/yellow-500',
              type: 'color',
              isAlias: false,
              value: '#F5D431',
            },
            {
              name: 'Color/Yellow/yellow-600',
              type: 'color',
              isAlias: false,
              value: '#D4B321',
            },
            {
              name: 'Color/Yellow/yellow-700',
              type: 'color',
              isAlias: false,
              value: '#A38B10',
            },
            {
              name: 'Color/Yellow/yellow-800',
              type: 'color',
              isAlias: false,
              value: '#857007',
            },
            {
              name: 'Color/Yellow/yellow-900',
              type: 'color',
              isAlias: false,
              value: '#5C4D00',
            },
            {
              name: 'Color/Green/green-50',
              type: 'color',
              isAlias: false,
              value: '#EBFFEE',
            },
            {
              name: 'Color/Green/green-100',
              type: 'color',
              isAlias: false,
              value: '#D6FFDD',
            },
            {
              name: 'Color/Green/green-200',
              type: 'color',
              isAlias: false,
              value: '#A8F7B5',
            },
            {
              name: 'Color/Green/green-300',
              type: 'color',
              isAlias: false,
              value: '#81F794',
            },
            {
              name: 'Color/Green/green-400',
              type: 'color',
              isAlias: false,
              value: '#71F587',
            },
            {
              name: 'Color/Green/green-500',
              type: 'color',
              isAlias: false,
              value: '#45F562',
            },
            {
              name: 'Color/Green/green-600',
              type: 'color',
              isAlias: false,
              value: '#29CC44',
            },
            {
              name: 'Color/Green/green-700',
              type: 'color',
              isAlias: false,
              value: '#10A329',
            },
            {
              name: 'Color/Green/green-800',
              type: 'color',
              isAlias: false,
              value: '#07851C',
            },
            {
              name: 'Color/Green/green-900',
              type: 'color',
              isAlias: false,
              value: '#005C0F',
            },
            {
              name: 'Color/Orange/orange-50',
              type: 'color',
              isAlias: false,
              value: '#FFF1EB',
            },
            {
              name: 'Color/Orange/orange-100',
              type: 'color',
              isAlias: false,
              value: '#FFE4D6',
            },
            {
              name: 'Color/Orange/orange-200',
              type: 'color',
              isAlias: false,
              value: '#FFCFB8',
            },
            {
              name: 'Color/Orange/orange-300',
              type: 'color',
              isAlias: false,
              value: '#FFBB99',
            },
            {
              name: 'Color/Orange/orange-400',
              type: 'color',
              isAlias: false,
              value: '#FF9C6B',
            },
            {
              name: 'Color/Orange/orange-500',
              type: 'color',
              isAlias: false,
              value: '#F57F45',
            },
            {
              name: 'Color/Orange/orange-600',
              type: 'color',
              isAlias: false,
              value: '#CC5F29',
            },
            {
              name: 'Color/Orange/orange-700',
              type: 'color',
              isAlias: false,
              value: '#A34110',
            },
            {
              name: 'Color/Orange/orange-800',
              type: 'color',
              isAlias: false,
              value: '#853107',
            },
            {
              name: 'Color/Orange/orange-900',
              type: 'color',
              isAlias: false,
              value: '#5C1F00',
            },
            {
              name: 'Color/Pink/pink-50',
              type: 'color',
              isAlias: false,
              value: '#FEEAFB',
            },
            {
              name: 'Color/Pink/pink-100',
              type: 'color',
              isAlias: false,
              value: '#FFD6F9',
            },
            {
              name: 'Color/Pink/pink-200',
              type: 'color',
              isAlias: false,
              value: '#FFB8F3',
            },
            {
              name: 'Color/Pink/pink-300',
              type: 'color',
              isAlias: false,
              value: '#FA9BEA',
            },
            {
              name: 'Color/Pink/pink-400',
              type: 'color',
              isAlias: false,
              value: '#F872E2',
            },
            {
              name: 'Color/Pink/pink-500',
              type: 'color',
              isAlias: false,
              value: '#F545F5',
            },
            {
              name: 'Color/Pink/pink-600',
              type: 'color',
              isAlias: false,
              value: '#CC29CC',
            },
            {
              name: 'Color/Pink/pink-700',
              type: 'color',
              isAlias: false,
              value: '#A310A3',
            },
            {
              name: 'Color/Pink/pink-800',
              type: 'color',
              isAlias: false,
              value: '#850685',
            },
            {
              name: 'Color/Pink/pink-900',
              type: 'color',
              isAlias: false,
              value: '#5C005C',
            },
            {
              name: 'Color/Neutral/neutral-25',
              type: 'color',
              isAlias: false,
              value: '#F7F7F7',
            },
            {
              name: 'Color/Neutral/neutral-50',
              type: 'color',
              isAlias: false,
              value: '#F2F2F2',
            },
            {
              name: 'Color/Neutral/neutral-75',
              type: 'color',
              isAlias: false,
              value: '#EDEDED',
            },
            {
              name: 'Color/Neutral/neutral-100',
              type: 'color',
              isAlias: false,
              value: '#E6E6E6',
            },
            {
              name: 'Color/Neutral/neutral-150',
              type: 'color',
              isAlias: false,
              value: '#D9D9D9',
            },
            {
              name: 'Color/Neutral/neutral-200',
              type: 'color',
              isAlias: false,
              value: '#CCCCCC',
            },
            {
              name: 'Color/Neutral/neutral-250',
              type: 'color',
              isAlias: false,
              value: '#BFBFBF',
            },
            {
              name: 'Color/Neutral/neutral-300',
              type: 'color',
              isAlias: false,
              value: '#B2B2B2',
            },
            {
              name: 'Color/Neutral/neutral-400',
              type: 'color',
              isAlias: false,
              value: '#999999',
            },
            {
              name: 'Color/Neutral/neutral-500',
              type: 'color',
              isAlias: false,
              value: '#808080',
            },
            {
              name: 'Color/Neutral/neutral-600',
              type: 'color',
              isAlias: false,
              value: '#666666',
            },
            {
              name: 'Color/Neutral/neutral-700',
              type: 'color',
              isAlias: false,
              value: '#4D4D4D',
            },
            {
              name: 'Color/Neutral/neutral-800',
              type: 'color',
              isAlias: false,
              value: '#333333',
            },
            {
              name: 'Color/Neutral/neutral-820',
              type: 'color',
              isAlias: false,
              value: '#2E2E2E',
            },
            {
              name: 'Color/Neutral/neutral-850',
              type: 'color',
              isAlias: false,
              value: '#262626',
            },
            {
              name: 'Color/Neutral/neutral-880',
              type: 'color',
              isAlias: false,
              value: '#1F1F1F',
            },
            {
              name: 'Color/Neutral/neutral-900',
              type: 'color',
              isAlias: false,
              value: '#1A1A1A',
            },
            {
              name: 'Color/Neutral/neutral-920',
              type: 'color',
              isAlias: false,
              value: '#141414',
            },
            {
              name: 'Color/Neutral/neutral-950',
              type: 'color',
              isAlias: false,
              value: '#0D0D0D',
            },
          ],
        },
      ],
    },
    {
      name: 'Component ( Colors )',
      modes: [
        {
          name: 'Color',
          variables: [
            {
              name: 'Button/Primary/Surface/button-primary-surface-default',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-primary-inverse',
              },
            },
            {
              name: 'Button/Primary/Surface/button-primary-surface-hovered',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-hovered',
              },
            },
            {
              name: 'Button/Primary/Surface/button-primary-surface-focused',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-primary-inverse',
              },
            },
            {
              name: 'Button/Primary/Surface/button-primary-surface-disabled',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-muted',
              },
            },
            {
              name: 'Button/Primary/Text/button-primary-text-default',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-inverse',
              },
            },
            {
              name: 'Button/Primary/Text/button-primary-text-hovered',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-primary',
              },
            },
            {
              name: 'Button/Primary/Text/button-primary-text-focused',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-inverse',
              },
            },
            {
              name: 'Button/Primary/Text/button-primary-text-disabled',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-muted',
              },
            },
            {
              name: 'Button/Secondary/Surface/button-secondary-surface-default',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-hovered',
              },
            },
            {
              name: 'Button/Secondary/Surface/button-secondary-surface-hovered',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Background/color-bg-overlay',
              },
            },
            {
              name: 'Button/Secondary/Surface/button-secondary-surface-focused',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-hovered',
              },
            },
            {
              name: 'Button/Secondary/Surface/button-secondary-surface-disabled',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Background/color-bg-overlay',
              },
            },
            {
              name: 'Button/Tertiary/Surface/button-tertiary-surface-default',
              type: 'color',
              isAlias: false,
              value: '#00000000',
            },
            {
              name: 'Button/Tertiary/Surface/button-tertiary-surface-hovered',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-tertiary',
              },
            },
            {
              name: 'Button/Tertiary/Surface/button-tertiary-surface-focused',
              type: 'color',
              isAlias: false,
              value: '#00000003',
            },
            {
              name: 'Button/Tertiary/Surface/button-tertiary-surface-disabled',
              type: 'color',
              isAlias: false,
              value: '#00000000',
            },
            {
              name: 'Button/Secondary/Text/button-secondary-text-default',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-primary',
              },
            },
            {
              name: 'Button/Secondary/Text/button-secondary-text-hovered',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-primary',
              },
            },
            {
              name: 'Button/Secondary/Text/button-secondary-text-focused',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-primary',
              },
            },
            {
              name: 'Button/Secondary/Text/button-secondary-text-disabled',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-muted',
              },
            },
            {
              name: 'Button/Outline/Text/button-outline-text-default',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-primary',
              },
            },
            {
              name: 'Button/Outline/Text/button-outline-text-hovered',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-secondary',
              },
            },
            {
              name: 'Button/Outline/Text/button-outline-text-focused',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-primary',
              },
            },
            {
              name: 'Button/Outline/Text/button-outline-text-disabled',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-muted',
              },
            },
            {
              name: 'Button/Tertiary/Text/button-tertiary-text-default',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-primary',
              },
            },
            {
              name: 'Button/Tertiary/Text/button-tertiary-text-hovered',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-primary',
              },
            },
            {
              name: 'Button/Tertiary/Text/button-tertiary-text-focused',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-primary',
              },
            },
            {
              name: 'Button/Tertiary/Text/button-tertiary-text-disabled',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-muted',
              },
            },
            {
              name: 'Button/Primary/Border/button-primary-border-focused',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Blue/blue-500',
              },
            },
            {
              name: 'Button/Secondary/Border/button-secondary-border-focused',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Blue/blue-500',
              },
            },
            {
              name: 'Button/Outline/Border/button-outline-border-default',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Border/color-border-primary',
              },
            },
            {
              name: 'Button/Secondary/Surface/button-secondary-outline-default',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF00',
            },
            {
              name: 'Button/Secondary/Surface/button-outline-surface-hovered',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF00',
            },
            {
              name: 'Button/Outline/Border/button-outline-border-hovered',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-primary',
              },
            },
            {
              name: 'Button/Secondary/Surface/button-outline-surface-focused',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF03',
            },
            {
              name: 'Button/Outline/Border/button-outline-border-focused',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Background/color-bg-info',
              },
            },
            {
              name: 'Button/Secondary/Surface/button-outline-surface-disabled',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF00',
            },
            {
              name: 'Button/Outline/Border/button-outline-border-disabled',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Border/color-border-primary',
              },
            },
            {
              name: 'Button/Tertiary/Border/button-tertiary-border-focused',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Blue/blue-500',
              },
            },
            {
              name: 'Button/Link/Text/button-link-text-default',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-primary',
              },
            },
            {
              name: 'Button/Link/Text/button-link-text-hovered',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-tertiary',
              },
            },
            {
              name: 'Alert/Info/alert-info-surface',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surfaces/Information/color-surface-info-base',
              },
            },
            {
              name: 'Button/Link/Text/button-link-text-disabled',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-muted',
              },
            },
            {
              name: 'Alert/Warning/alert-warning-surface',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surfaces/Caution/color-surface-caution-base',
              },
            },
            {
              name: 'Alert/Info/alert-info-title',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foregrounds/Information/color-fg-info-emphasis',
              },
            },
            {
              name: 'Alert/alert-cancel',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foregrounds/Primary/color-fg-primary-subdued',
              },
            },
            {
              name: 'Alert/Warning/alert-warning-title',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foregrounds/Caution/color-fg-caution-emphasis',
              },
            },
            {
              name: 'Alert/Info/alert-info-text',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foregrounds/Information/color-fg-info-alt-base',
              },
            },
            {
              name: 'Alert/Info/alert-info-icon-fill',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foregrounds/Information/color-fg-info-base',
              },
            },
            {
              name: 'Alert/Warning/alert-warning-text',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foregrounds/Caution/color-fg-caution-alt-base',
              },
            },
            {
              name: 'Alert/Info/alert-info-icon-stroke',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surfaces/Information/color-surface-info-base',
              },
            },
            {
              name: 'Alert/Warning/alert-warning-icon-fill',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Background/Caution/color-bg-caution-base',
              },
            },
            {
              name: 'Alert/Info/alert-info-border',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Borders/Information/color-border-info-base',
              },
            },
            {
              name: 'Alert/Warning/alert-warning-icon-stroke',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surfaces/Caution/color-surface-caution-base',
              },
            },
            {
              name: 'Alert/Warning/alert-warning-border',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Borders/Caution/color-border-caution-base',
              },
            },
            {
              name: 'Alert/Error/alert-error-surface',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surfaces/Negative/color-surface-negative-base',
              },
            },
            {
              name: 'Alert/Error/alert-error-title',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foregrounds/Negative/color-fg-negative-base',
              },
            },
            {
              name: 'Alert/Error/alert-error-text',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foregrounds/Negative/color-fg-negative-alt-base',
              },
            },
            {
              name: 'Alert/Error/alert-error-icon-fill',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foregrounds/Negative/color-fg-negative-base',
              },
            },
            {
              name: 'Alert/Error/alert-error-icon-stroke',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surfaces/Negative/color-surface-negative-base',
              },
            },
            {
              name: 'Alert/Success/alert-success-surface',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surfaces/Positive/color-surface-positive-base',
              },
            },
            {
              name: 'Alert/Error/alert-info-border',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Borders/Negative/color-border-negative-base',
              },
            },
            {
              name: 'Alert/Success/alert-success-title',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foregrounds/Positive/color-fg-positive-emphasis',
              },
            },
            {
              name: 'Alert/Success/alert-success-text',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foregrounds/Positive/color-fg-positive-alt-base',
              },
            },
            {
              name: 'Alert/Success/alert-success-icon-fill',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foregrounds/Positive/color-fg-positive-base',
              },
            },
            {
              name: 'Alert/Success/alert-success-icon-stroke',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surfaces/Positive/color-surface-positive-base',
              },
            },
            {
              name: 'Alert/Success/alert-success-border',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Borders/Positive/color-border-positive-base',
              },
            },
            {
              name: 'Alert/Loading/alert-loading-surface',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surfaces/Innovative/color-surface-innovative-base',
              },
            },
            {
              name: 'Alert/Loading/alert-loading-title',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Background/Innovative/color-bg-innovative-emphasis',
              },
            },
            {
              name: 'Alert/Loading/alert-loading-text',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foregrounds/Innovative/color-fg-innovative-alt-base',
              },
            },
            {
              name: 'Alert/Loading/alert-loading-icon-fill',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foregrounds/Innovative/color-fg-innovative-base',
              },
            },
            {
              name: 'Alert/Loading/alert-loading-icon-stroke',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surfaces/Innovative/color-surface-innovative-base',
              },
            },
            {
              name: 'Alert/Loading/alert-loading-border',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Borders/Innovative/color-border-innovative-base',
              },
            },
            {
              name: 'Tag/Solid/Surface/tag-solid-surface-default',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-primary',
              },
            },
            {
              name: 'Tag/Solid/Surface/tag-solid-surface-green',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Background/color-bg-success',
              },
            },
            {
              name: 'Tag/Solid/Surface/tag-solid-surface-yellow',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Background/color-bg-alert',
              },
            },
            {
              name: 'Tag/Solid/Surface/tag-solid-surface-orange',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Background/color-bg-warning',
              },
            },
            {
              name: 'Tag/Solid/Surface/tag-solid-surface-red',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Background/color-bg-Error',
              },
            },
            {
              name: 'Tag/Solid/Surface/tag-solid-surface-blue',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Background/color-bg-info',
              },
            },
            {
              name: 'Tag/Solid/Surface/tag-solid-surface-purple',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Background/color-bg-purple',
              },
            },
            {
              name: 'Tag/Subtle/Surface/tag-subtle-surface-default',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Background/color-bg-secondary',
              },
            },
            {
              name: 'Tag/Subtle/Surface/tag-subtle-surface-green',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/colors-surface-success-secondary',
              },
            },
            {
              name: 'Tag/Subtle/Surface/tag-subtle-surface-yellow',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-alert-secondary',
              },
            },
            {
              name: 'Tag/Subtle/Surface/tag-subtle-surface-orange',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-warn-secondary',
              },
            },
            {
              name: 'Tag/Subtle/Surface/tag-subtle-surface-red',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-error-secondary',
              },
            },
            {
              name: 'Tag/Subtle/Surface/tag-subtle-surface-blue',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-info-secondary',
              },
            },
            {
              name: 'Tag/Subtle/Surface/tag-subtle-surface-purple',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-purple-secondary',
              },
            },
            {
              name: 'Tag/alert-cancel',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-700',
              },
            },
            {
              name: 'Navbar/navbar-surface',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-primary',
              },
            },
            {
              name: 'Navbar/navbar-fg-active',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-primary',
              },
            },
            {
              name: 'Navbar/navbar-fg-inactive',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-tertiary',
              },
            },
            {
              name: 'Typography/text-primary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-primary',
              },
            },
            {
              name: 'Typography/text-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-secondary',
              },
            },
            {
              name: 'Typography/text-tertiary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-tertiary',
              },
            },
            {
              name: 'Form/Input Field/Surface/form-input-surface-default',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-secondary',
              },
            },
            {
              name: 'Form/Color',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Form/Input Field/Surface/form-input-surface-hovered',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-secondary',
              },
            },
            {
              name: 'Form/Input Field/Surface/form-input-surface-focused',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-secondary',
              },
            },
            {
              name: 'Form/Input Field/Surface/form-input-surface-error',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-secondary',
              },
            },
            {
              name: 'Form/Input Field/Surface/form-input-surface-disabled',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-muted',
              },
            },
            {
              name: 'Form/Input Field/Foreground/form-input-fg-default',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-primary',
              },
            },
            {
              name: 'Form/Input Field/Foreground/form-input-fg-hovered',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-primary',
              },
            },
            {
              name: 'Form/Input Field/Foreground/form-input-fg-focused',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-primary',
              },
            },
            {
              name: 'Form/Input Field/Foreground/form-input-fg-error',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-primary',
              },
            },
            {
              name: 'Form/Input Field/Foreground/form-input-fg-disabled',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-muted',
              },
            },
            {
              name: 'Form/Helper Text/form-helper-default',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-tertiary',
              },
            },
            {
              name: 'Form/Helper Text/form-helper-success',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-success',
              },
            },
            {
              name: 'Form/Helper Text/form-helper-error',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-error',
              },
            },
            {
              name: 'Form/Helper Text/form-helper-warning',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-warning',
              },
            },
            {
              name: 'Form/Helper Text/form-helper-info',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Background/color-bg-info',
              },
            },
            {
              name: 'Form/Label/form-',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Form/Input Field/Placeholder/form-input-placholder-default',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Placeholder/color-placeholder-primary',
              },
            },
            {
              name: 'Form/Input Field/Placeholder/form-input-placeholder-hovered',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Placeholder/color-placeholder-primary',
              },
            },
            {
              name: 'Form/Input Field/Placeholder/form-input-placeholder-focused',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Placeholder/color-placeholder-primary',
              },
            },
            {
              name: 'Form/Input Field/Placeholder/form-input-placeholder-error',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Placeholder/color-placeholder-primary',
              },
            },
            {
              name: 'Form/Input Field/Placeholder/form-input-placeholder-disabled',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-muted',
              },
            },
            {
              name: 'Form/Input Field/Border/form-input-border-default',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Border/color-border-primary',
              },
            },
            {
              name: 'Form/Input Field/Border/form-input-border-hovered',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Border/color-border-hovered',
              },
            },
            {
              name: 'Form/Input Field/Border/form-input-border-focused',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Border/color-border-focus',
              },
            },
            {
              name: 'Form/Input Field/Border/form-input-border-error',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Border/color-border-error',
              },
            },
            {
              name: 'Form/Checkbox/Surface/form-checkbox-surface-default',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Component ( Colors )',
                name: 'Form/Input Field/Surface/form-input-surface-default',
              },
            },
            {
              name: 'Form/Input Field/Border/form-input-border-disabled',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Border/color-border-primary',
              },
            },
            {
              name: 'Form/Checkbox/Surface/form-checkbox-surface-default-checked',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Interactions/color-interaction-primary',
              },
            },
            {
              name: 'Form/Checkbox/Surface/form-checkbox-surface-hovered',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Border/color-border-secondary',
              },
            },
            {
              name: 'Form/Checkbox/Surface/form-checkbox-surface-hovered-checked',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Interactions/color-interaction-primary',
              },
            },
            {
              name: 'Form/Checkbox/Surface/form-checkbox-surface-focused',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF03',
            },
            {
              name: 'Form/Checkbox/Surface/form-checkbox-surface-focused-checked',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Interactions/color-interaction-primary',
              },
            },
            {
              name: 'Form/Checkbox/Surface/form-checkbox-surface-disabled',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Interactions/color-interaction-muted',
              },
            },
            {
              name: 'Form/Checkbox/Surface/form-checkbox-surface-disabled-checked',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Interactions/color-interaction-muted',
              },
            },
            {
              name: 'Form/Checkbox/Icon/form-checkbox-icon-default',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Background/color-bg-primary',
              },
            },
            {
              name: 'Form/Checkbox/Icon/form-checkbox-icon-hovered',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Background/color-bg-primary',
              },
            },
            {
              name: 'Form/Checkbox/Icon/form-checkbox-icon-focused',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Background/color-bg-primary',
              },
            },
            {
              name: 'Form/Checkbox/Icon/form-checkbox-icon-disabled',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Background/color-bg-inverse',
              },
            },
            {
              name: 'Form/Checkbox/Border/form-checkbox-border-default',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Component ( Colors )',
                name: 'Form/Input Field/Border/form-input-border-default',
              },
            },
            {
              name: 'Form/Checkbox/Border/form-checkbox-border-hovered',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Border/color-border-secondary',
              },
            },
            {
              name: 'Form/Checkbox/Border/form-checkbox-border-focused',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Border/color-border-primary',
              },
            },
            {
              name: 'Form/Checkbox/Border/form-checkbox-border-disabled',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Interactions/color-interaction-muted',
              },
            },
            {
              name: 'Form/Media Upload/Surface/form-uploader-surface-default',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF03',
            },
            {
              name: 'Form/Media Upload/Surface/form-uploader-surface-dropping',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-tertiary',
              },
            },
            {
              name: 'Form/Media Upload/Surface/form-uploader-surface-uploading',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-tertiary',
              },
            },
            {
              name: 'Form/Media Upload/Surface/form-checkbox-surface-success',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF03',
            },
            {
              name: 'Form/Media Upload/Surface/form-checkbox-surface-warning',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF03',
            },
            {
              name: 'Form/Media Upload/Surface/form-checkbox-surface-error',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF03',
            },
            {
              name: 'Form/Media Upload/Border/form-uploader-border-default',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Border/color-border-secondary',
              },
            },
            {
              name: 'Form/Media Upload/Border/form-uploader-border-dropping',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Border/color-border-secondary',
              },
            },
            {
              name: 'Form/Media Upload/Border/form-uploader-border-uploading',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Border/color-border-secondary',
              },
            },
            {
              name: 'Form/Media Upload/Border/form-uploader-border-success',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Border/color-border-secondary',
              },
            },
            {
              name: 'Form/Media Upload/Border/form-uploader-border-danger',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Border/color-border-secondary',
              },
            },
            {
              name: 'Form/Media Upload/Border/form-uploader-border-error',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Border/color-border-secondary',
              },
            },
            {
              name: 'Form/Media Upload/Icon/form-uploader-icon-default',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-info',
              },
            },
            {
              name: 'Form/Media Upload/Icon/form-uploader-icon-uploading',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-success',
              },
            },
            {
              name: 'Form/Media Upload/Icon/form-uploader-icon-dropping',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-success',
              },
            },
            {
              name: 'Form/Media Upload/Icon/form-uploader-icon-success',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-success',
              },
            },
            {
              name: 'Form/Media Upload/Icon/form-uploader-icon-warning',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-warning',
              },
            },
            {
              name: 'Form/Media Upload/Icon/form-uploader-icon-error',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-error',
              },
            },
            {
              name: 'Form/Media Upload/Image/form-uploader-img-default',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-tertiary',
              },
            },
            {
              name: 'Form/Media Upload/Image/form-uploader-img-dropping',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-hovered',
              },
            },
            {
              name: 'Form/Media Upload/Image/form-uploader-img-uploading',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-hovered',
              },
            },
            {
              name: 'Form/Media Upload/Image/form-uploader-img-success',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/colors-surface-success',
              },
            },
            {
              name: 'Form/Media Upload/Image/form-uploader-img-warning',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-warn',
              },
            },
            {
              name: 'Form/Media Upload/Image/form-uploader-img-error',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-warn',
              },
            },
            {
              name: 'Form/Media Upload/Link/form-uploader-link-default',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Interactions/color-interaction-primary',
              },
            },
            {
              name: 'Form/Media Upload/Link/form-uploader-link-dropping',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Interactions/color-interaction-primary',
              },
            },
            {
              name: 'Form/Media Upload/Link/form-uploader-link-uploading',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Interactions/color-interaction-primary',
              },
            },
            {
              name: 'Form/Media Upload/Link/form-uploader-link-success',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Interactions/color-interaction-primary',
              },
            },
            {
              name: 'Form/Media Upload/Link/form-uploader-link-warning',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Interactions/color-interaction-primary',
              },
            },
            {
              name: 'Form/Media Upload/Link/form-uploader-link-error',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Interactions/color-interaction-primary',
              },
            },
            {
              name: 'Form/Media Upload/Text/form-uploader-text-default',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-primary',
              },
            },
            {
              name: 'Form/Media Upload/Text/form-uploader-text-dropping',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-primary',
              },
            },
            {
              name: 'Form/Media Upload/Text/form-uploader-text-uploading',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-primary',
              },
            },
            {
              name: 'Form/Media Upload/Text/form-uploader-text-success',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-success',
              },
            },
            {
              name: 'Form/Media Upload/Text/form-uploader-text-warning',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-warning',
              },
            },
            {
              name: 'Form/Media Upload/Text/form-uploader-text-error',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-error',
              },
            },
            {
              name: 'Form/Toggle Switch/Surface/form-switch-surface-default-on',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Interactions/color-interaction-primary',
              },
            },
            {
              name: 'Form/Toggle Switch/Surface/form-switch-surface-default-off',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Border/color-border-secondary',
              },
            },
            {
              name: 'Form/Toggle Switch/Surface/form-switch-surface-focused-on',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Interactions/color-interaction-primary',
              },
            },
            {
              name: 'Form/Toggle Switch/Surface/form-switch-surface-focused-off',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-tertiary',
              },
            },
            {
              name: 'Form/Toggle Switch/Surface/form-switch-surface-disabled-on',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Interactions/color-interaction-primary',
              },
            },
            {
              name: 'Form/Toggle Switch/Surface/form-switch-surface-disabled-off',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-tertiary',
              },
            },
            {
              name: 'Form/Toggle Switch/Button/form-switch-button-default-on',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'White',
              },
            },
            {
              name: 'Form/Toggle Switch/Button/form-switch-button-default-off',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'White',
              },
            },
            {
              name: 'Form/Toggle Switch/Button/form-switch-button-focused-on',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'White',
              },
            },
            {
              name: 'Form/Toggle Switch/Button/form-switch-button-focused-off',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'White',
              },
            },
            {
              name: 'Form/Toggle Switch/Button/form-switch-button-disabled-on',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'White',
              },
            },
            {
              name: 'Form/Toggle Switch/Button/form-switch-button-disabled-off',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'White',
              },
            },
            {
              name: 'Form/Toggle Switch/Border/form-switch-border-default-on',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Background/color-bg-info',
              },
            },
            {
              name: 'Form/Toggle Switch/Border/form-switch-border-default-off',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Border/color-border-secondary',
              },
            },
            {
              name: 'Form/Toggle Switch/Border/form-switch-border-hovered-on',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Background/color-bg-info',
              },
            },
            {
              name: 'Form/Toggle Switch/Border/form-switch-border-hovered-off',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-tertiary',
              },
            },
            {
              name: 'Form/Toggle Switch/Border/form-switch-border-focused-on',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Background/color-bg-info',
              },
            },
            {
              name: 'Form/Toggle Switch/Border/form-switch-border-focused-off',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-tertiary',
              },
            },
            {
              name: 'Form/Toggle Switch/Border/form-switch-border-disabled-on',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Background/color-bg-info',
              },
            },
            {
              name: 'Form/Toggle Switch/Border/form-switch-border-disabled-off',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-tertiary',
              },
            },
            {
              name: 'Tag/Solid/Text/tag-solid-text-default',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Component ( Colors )',
                name: 'Sub Heads/subhead-fg-primary',
              },
            },
            {
              name: 'Tag/Solid/Text/tag-solid-text-green',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Black',
              },
            },
            {
              name: 'Tag/Solid/Text/tag-solid-text-yellow',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Black',
              },
            },
            {
              name: 'Tag/Solid/Text/tag-solid-text-orange',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Orange/orange-50',
              },
            },
            {
              name: 'Tag/Solid/Text/tag-solid-text-red',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Red/red-50',
              },
            },
            {
              name: 'Tag/Solid/Text/tag-solid-text-blue',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Blue/blue-50',
              },
            },
            {
              name: 'Tag/Solid/Icon/tag-solid-icon-default',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-900',
              },
            },
            {
              name: 'Tag/Solid/Text/tag-solid-text-purple',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'White',
              },
            },
            {
              name: 'Tag/Solid/Icon/tag-solid-icon-green',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-900',
              },
            },
            {
              name: 'Tag/Solid/Icon/tag-solid-icon-yellow',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-900',
              },
            },
            {
              name: 'Tag/Solid/Icon/tag-solid-icon-orange',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-900',
              },
            },
            {
              name: 'Tag/Solid/Icon/tag-solid-icon-red',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-900',
              },
            },
            {
              name: 'Tag/Solid/Icon/tag-solid-icon-blue',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-900',
              },
            },
            {
              name: 'Tag/Solid/Border/tag-solid-border-default',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-900',
              },
            },
            {
              name: 'Tag/Solid/Icon/tag-solid-icon-purple',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-900',
              },
            },
            {
              name: 'Tag/Solid/Border/tag-solid-border-green',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-900',
              },
            },
            {
              name: 'Tag/Solid/Border/tag-solid-border-yellow',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-900',
              },
            },
            {
              name: 'Tag/Solid/Border/tag-solid-border-orange',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-900',
              },
            },
            {
              name: 'Tag/Solid/Border/alert-solid-border-red',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-900',
              },
            },
            {
              name: 'Tag/Solid/Border/tag-solid-border-blue',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-900',
              },
            },
            {
              name: 'Tag/Solid/Border/alert-subtle-surface-purple',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-900',
              },
            },
            {
              name: 'Tag/Subtle/Text/tag-subtle-text-default',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Background/color-bg-inverse',
              },
            },
            {
              name: 'Tag/Subtle/Text/tag-subtle-text-green',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-success-secondary',
              },
            },
            {
              name: 'Tag/Subtle/Text/tag-subtle-text-yellow',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-alert-secondary',
              },
            },
            {
              name: 'Tag/Subtle/Text/tag-subtle-text-orange',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-warning-secondary',
              },
            },
            {
              name: 'Tag/Subtle/Text/tag-subtle-text-red',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-error-secondary',
              },
            },
            {
              name: 'Tag/Subtle/Text/tag-subtle-text-blue',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-info-secondary',
              },
            },
            {
              name: 'Tag/Subtle/Icon/tag-subtle-icon-default',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-900',
              },
            },
            {
              name: 'Tag/Subtle/Text/tag-subtle-text-purple',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-purple-secondary',
              },
            },
            {
              name: 'Tag/Subtle/Icon/tag-subtle-icon-green',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-900',
              },
            },
            {
              name: 'Tag/Subtle/Icon/tag-subtle-icon-yellow',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-900',
              },
            },
            {
              name: 'Tag/Subtle/Icon/tag-subtle-icon-orange',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-900',
              },
            },
            {
              name: 'Tag/Subtle/Icon/tag-subtle-icon-red',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-900',
              },
            },
            {
              name: 'Tag/Subtle/Icon/tag-subtle-icon-blue',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-900',
              },
            },
            {
              name: 'Tag/Subtle/Icon/tag-subtle-icon-purple',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-900',
              },
            },
            {
              name: 'Tag/Subtle/Border/tag-subtle-border-default',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-900',
              },
            },
            {
              name: 'Tag/Subtle/Border/tag-subtle-border-green',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-900',
              },
            },
            {
              name: 'Tag/Subtle/Border/tag-subtle-border-yellow',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-900',
              },
            },
            {
              name: 'Tag/Subtle/Border/tag-subtle-border-orange',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-900',
              },
            },
            {
              name: 'Tag/Subtle/Border/tag-subtle-border-red',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-900',
              },
            },
            {
              name: 'Tag/Subtle/Border/tag-subtle-border-blue',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-900',
              },
            },
            {
              name: 'Tag/Subtle/Border/tag-solid-border-purple',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-900',
              },
            },
            {
              name: 'Sub Heads/subhead-fg-primary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-primary',
              },
            },
            {
              name: 'Sub Heads/subhead-fg-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-secondary',
              },
            },
            {
              name: 'Sub Heads/subhead-fg-tertiary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-tertiary',
              },
            },
            {
              name: 'Tab/tab-fg-active',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foregrounds/Primary/color-fg-primary-depth',
              },
            },
            {
              name: 'Tab/tab-fg-inactive',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foregrounds/Primary/color-fg-primary-subdued',
              },
            },
            {
              name: 'Tab/tab-surface-active',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surfaces/Cool/color-surface-cool-base',
              },
            },
            {
              name: 'Tab/tab-surface-inactive',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Background/Primary/color-bg-primary-subdued',
              },
            },
            {
              name: 'Tab/tab-border-active',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foregrounds/Primary/color-fg-primary-depth',
              },
            },
            {
              name: 'Tab/tab-border-inactive',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF00',
            },
            {
              name: 'Button/Danger/Surface/button-danger-surface-default',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Background/color-bg-Error',
              },
            },
            {
              name: 'Button/Danger/Surface/button-danger-surface-hovered',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Background/color-bg-Error',
              },
            },
            {
              name: 'Button/Danger/Surface/button-danger-surface-focused',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Background/color-bg-Error',
              },
            },
            {
              name: 'Button/Danger/Surface/button-danger-surface-disabled',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-error-secondary',
              },
            },
            {
              name: 'Button/Danger/Text/button-danger-text-default',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'White',
              },
            },
            {
              name: 'Button/Danger/Text/button-danger-text-hovered',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'White',
              },
            },
            {
              name: 'Button/Danger/Text/button-danger-text-focused',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'White',
              },
            },
            {
              name: 'Button/Danger/Text/button-danger-text-disabled',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-500',
              },
            },
            {
              name: 'Button/Danger/Border/button-danger-border-focused',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Red/red-500',
              },
            },
            {
              name: 'Button/Danger/Surface/button-danger-outline-default',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF00',
            },
            {
              name: 'Button/Danger/Surface/button-outline-surface-hovered',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF00',
            },
            {
              name: 'Button/Danger/Surface/button-outline-surface-focused',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF03',
            },
            {
              name: 'Button/Danger/Surface/button-outline-surface-disabled',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF00',
            },
            {
              name: 'Button/Success/Surface/button-success-surface-default',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Background/color-bg-success',
              },
            },
            {
              name: 'Button/Success/Surface/button-success-surface-hovered',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Background/color-bg-success',
              },
            },
            {
              name: 'Button/Success/Surface/button-success-surface-focused',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Background/color-bg-success',
              },
            },
            {
              name: 'Button/Success/Surface/button-success-surface-disabled',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-success-secondary',
              },
            },
            {
              name: 'Button/Success/Text/button-success-text-default',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Black',
              },
            },
            {
              name: 'Button/Success/Text/button-success-text-hovered',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Black',
              },
            },
            {
              name: 'Button/Success/Text/button-success-text-focused',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Black',
              },
            },
            {
              name: 'Button/Success/Text/button-success-text-disabled',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-400',
              },
            },
            {
              name: 'Button/Success/Border/button-success-border-focused',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Green/green-500',
              },
            },
            {
              name: 'Button/Success/Surface/button-success-outline-default',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF00',
            },
            {
              name: 'Button/Success/Surface/button-outline-surface-hovered',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF00',
            },
            {
              name: 'Button/Success/Surface/button-outline-surface-focused',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF03',
            },
            {
              name: 'Button/Success/Surface/button-outline-surface-disabled',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF00',
            },
            {
              name: 'Avatar/avatar-surface',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-tertiary',
              },
            },
            {
              name: 'Avatar/avatar-status',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Background/color-bg-primary',
              },
            },
            {
              name: 'Avatar/avatar-status-icon',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-info',
              },
            },
            {
              name: 'Avatar/avatar-group-surface-primary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-tertiary',
              },
            },
            {
              name: 'Avatar/avatar-group-surface-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-overlay',
              },
            },
            {
              name: 'Avatar/avatar-group-surface-tertiary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Surface/color-surface-muted',
              },
            },
            {
              name: 'Avatar/avatar-group-text',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-primary',
              },
            },
            {
              name: 'Avatar/avatar-label-title',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-primary',
              },
            },
            {
              name: 'Avatar/avatar-label-subtitle',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-tertiary',
              },
            },
            {
              name: 'Avatar/avatar-label-description',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-secondary',
              },
            },
            {
              name: 'Avatar/subhead-fg-tertiary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Semantic ( Colors )',
                name: 'Colors/Foreground/color-fg-tertiary',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'Semantic ( Colors )',
      modes: [
        {
          name: 'Dark',
          variables: [
            {
              name: 'Colors/Background/Primary/color-bg-primary-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-920',
              },
            },
            {
              name: 'Colors/Background/Primary/color-bg-primary-depth',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Black',
              },
            },
            {
              name: 'Colors/Background/Primary/color-bg-primary-subdued',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-900',
              },
            },
            {
              name: 'Colors/Background/Primary/color-bg-primary-inverse',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-50',
              },
            },
            {
              name: 'Colors/Background/Cool/color-bg-cool-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-600',
              },
            },
            {
              name: 'Colors/Background/Cool/color-bg-cool-emphasis',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-500',
              },
            },
            {
              name: 'Colors/Background/Cool/color-bg-cool-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-700',
              },
            },
            {
              name: 'Colors/Background/Negative/color-bg-negative-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Red/red-500',
              },
            },
            {
              name: 'Colors/Background/Negative/color-bg-negative-emphasis',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Red/red-600',
              },
            },
            {
              name: 'Colors/Background/Negative/color-bg-negative-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Red/red-900',
              },
            },
            {
              name: 'Colors/Background/Positive/color-bg-positive-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Green/green-500',
              },
            },
            {
              name: 'Colors/Background/Positive/color-bg-positive-emphasis',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Green/green-600',
              },
            },
            {
              name: 'Colors/Background/Positive/color-bg-positive-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Green/green-900',
              },
            },
            {
              name: 'Colors/Background/Caution/color-bg-caution-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Yellow/yellow-500',
              },
            },
            {
              name: 'Colors/Background/Caution/color-bg-caution-emphasis',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Yellow/yellow-600',
              },
            },
            {
              name: 'Colors/Background/Caution/color-bg-caution-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Yellow/yellow-900',
              },
            },
            {
              name: 'Colors/Background/Information/color-bg-info-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Blue/blue-500',
              },
            },
            {
              name: 'Colors/Background/Information/color-bg-info-emphasis',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Blue/blue-600',
              },
            },
            {
              name: 'Colors/Background/Information/color-bg-info-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Blue/blue-900',
              },
            },
            {
              name: 'Colors/Background/Alert/color-bg-alert-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Orange/orange-500',
              },
            },
            {
              name: 'Colors/Background/Alert/color-bg-alert-emphasis',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Orange/orange-600',
              },
            },
            {
              name: 'Colors/Background/Alert/color-bg-alert-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Orange/orange-900',
              },
            },
            {
              name: 'Colors/Background/Innovative/color-bg-innovative-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Purple/purple-500',
              },
            },
            {
              name: 'Colors/Background/Innovative/color-bg-innovative-emphasis',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Purple/purple-600',
              },
            },
            {
              name: 'Colors/Background/Innovative/color-bg-innovative-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Purple/purple-900',
              },
            },
            {
              name: 'Colors/Surfaces/Primary/color-surface-primary-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-850',
              },
            },
            {
              name: 'Colors/Surfaces/Primary/color-surface-primary-depth',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-880',
              },
            },
            {
              name: 'Colors/Surfaces/Primary/color-surface-primary-subdued',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-800',
              },
            },
            {
              name: 'Colors/Surfaces/Primary/color-surface-primary-inverse',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-100',
              },
            },
            {
              name: 'Colors/Surfaces/Cool/color-surface-cool-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-800',
              },
            },
            {
              name: 'Colors/Surfaces/Cool/color-surface-cool-emphasis',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-700',
              },
            },
            {
              name: 'Colors/Surfaces/Cool/color-surface-cool-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-820',
              },
            },
            {
              name: 'Colors/Surfaces/Negative/color-surface-negative-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-850',
              },
            },
            {
              name: 'Colors/Surfaces/Negative/color-surface-negative-emphasis',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-800',
              },
            },
            {
              name: 'Colors/Surfaces/Negative/color-surface-negative-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-880',
              },
            },
            {
              name: 'Colors/Surfaces/Positive/color-surface-positive-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-850',
              },
            },
            {
              name: 'Colors/Surfaces/Positive/color-surface-positive-emphasis',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-800',
              },
            },
            {
              name: 'Colors/Surfaces/Positive/color-surface-positive-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-880',
              },
            },
            {
              name: 'Colors/Surfaces/Caution/color-surface-caution-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-850',
              },
            },
            {
              name: 'Colors/Surfaces/Caution/color-surface-caution-emphasis',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-800',
              },
            },
            {
              name: 'Colors/Surfaces/Caution/color-surface-caution-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-880',
              },
            },
            {
              name: 'Colors/Surfaces/Information/color-surface-info-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-850',
              },
            },
            {
              name: 'Colors/Surfaces/Information/color-surface-info-emphasis',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-800',
              },
            },
            {
              name: 'Colors/Surfaces/Information/color-surface-info-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-880',
              },
            },
            {
              name: 'Colors/Surfaces/Alert/color-surface-alert-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-850',
              },
            },
            {
              name: 'Colors/Surfaces/Alert/color-surface-alert-emphasis',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-800',
              },
            },
            {
              name: 'Colors/Surfaces/Alert/color-surface-alert-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-880',
              },
            },
            {
              name: 'Colors/Surfaces/Innovative/color-surface-innovative-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-850',
              },
            },
            {
              name: 'Colors/Surfaces/Innovative/color-surface-innovative-emphasis',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-800',
              },
            },
            {
              name: 'Colors/Surfaces/Innovative/color-bg-innovative-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-880',
              },
            },
            {
              name: 'Colors/Foregrounds/Primary/color-fg-primary-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-400',
              },
            },
            {
              name: 'Colors/Foregrounds/Primary/color-fg-primary-depth',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'White',
              },
            },
            {
              name: 'Colors/Foregrounds/Primary/color-fg-primary-subdued',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-600',
              },
            },
            {
              name: 'Colors/Foregrounds/Primary/color-fg-primary-inverse',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-920',
              },
            },
            {
              name: 'Colors/Foregrounds/Cool/color-fg-cool-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'White',
              },
            },
            {
              name: 'Colors/Foregrounds/Cool/color-fg-cool-emphasis',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'White',
              },
            },
            {
              name: 'Colors/Foregrounds/Cool/color-fg-cool-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-700',
              },
            },
            {
              name: 'Colors/Foregrounds/Negative/color-fg-negative-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Red/red-500',
              },
            },
            {
              name: 'Colors/Foregrounds/Negative/color-fg-negative-alt-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-600',
              },
            },
            {
              name: 'Colors/Foregrounds/Negative/color-fg-negative-emphasis',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Red/red-600',
              },
            },
            {
              name: 'Colors/Foregrounds/Negative/color-fg-negative-alt-emphasis',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-500',
              },
            },
            {
              name: 'Colors/Foregrounds/Negative/color-fg-negative-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Red/red-900',
              },
            },
            {
              name: 'Colors/Foregrounds/Negative/color-fg-negative-alt-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-700',
              },
            },
            {
              name: 'Colors/Foregrounds/Positive/color-fg-positive-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Green/green-500',
              },
            },
            {
              name: 'Colors/Foregrounds/Positive/color-fg-positive-alt-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-600',
              },
            },
            {
              name: 'Colors/Foregrounds/Positive/color-fg-positive-emphasis',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Green/green-600',
              },
            },
            {
              name: 'Colors/Foregrounds/Positive/color-fg-positive-alt-emphasis',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-500',
              },
            },
            {
              name: 'Colors/Foregrounds/Positive/color-fg-positive-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Green/green-900',
              },
            },
            {
              name: 'Colors/Foregrounds/Positive/color-fg-positive-alt-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-700',
              },
            },
            {
              name: 'Colors/Foregrounds/Caution/color-fg-caution-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Yellow/yellow-500',
              },
            },
            {
              name: 'Colors/Foregrounds/Caution/color-fg-caution-alt-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-600',
              },
            },
            {
              name: 'Colors/Foregrounds/Caution/color-fg-caution-emphasis',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Yellow/yellow-600',
              },
            },
            {
              name: 'Colors/Foregrounds/Caution/color-fg-caution-alt-emphasis',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-500',
              },
            },
            {
              name: 'Colors/Foregrounds/Caution/color-fg-caution-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Yellow/yellow-900',
              },
            },
            {
              name: 'Colors/Foregrounds/Caution/color-fg-positive-alt-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-700',
              },
            },
            {
              name: 'Colors/Foregrounds/Information/color-fg-info-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Blue/blue-500',
              },
            },
            {
              name: 'Colors/Foregrounds/Information/color-fg-info-alt-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-600',
              },
            },
            {
              name: 'Colors/Foregrounds/Information/color-fg-info-emphasis',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Blue/blue-600',
              },
            },
            {
              name: 'Colors/Foregrounds/Information/color-fg-info-alt-emphasis',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-500',
              },
            },
            {
              name: 'Colors/Foregrounds/Information/color-fg-info-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Blue/blue-900',
              },
            },
            {
              name: 'Colors/Foregrounds/Information/color-fg-info-alt-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-700',
              },
            },
            {
              name: 'Colors/Foregrounds/Alert/color-fg-alert-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Orange/orange-500',
              },
            },
            {
              name: 'Colors/Foregrounds/Alert/color-fg-alert-alt-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-600',
              },
            },
            {
              name: 'Colors/Foregrounds/Alert/color-fg-alert-emphasis',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Orange/orange-600',
              },
            },
            {
              name: 'Colors/Foregrounds/Alert/color-fg-alert-alt-emphasis',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-500',
              },
            },
            {
              name: 'Colors/Foregrounds/Alert/color-fg-alert-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Orange/orange-900',
              },
            },
            {
              name: 'Colors/Foregrounds/Alert/color-fg-alert-alt-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-700',
              },
            },
            {
              name: 'Colors/Foregrounds/Innovative/color-fg-innovative-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Purple/purple-500',
              },
            },
            {
              name: 'Colors/Foregrounds/Innovative/color-fg-innovative-alt-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-600',
              },
            },
            {
              name: 'Colors/Foregrounds/Innovative/color-fg-innovative-emphasis',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Purple/purple-600',
              },
            },
            {
              name: 'Colors/Foregrounds/Innovative/color-fg-innovative-alt-emphasis',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-500',
              },
            },
            {
              name: 'Colors/Foregrounds/Innovative/color-fg-innovative-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Purple/purple-900',
              },
            },
            {
              name: 'Colors/Foregrounds/Innovative/color-fg-innovative-alt-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-700',
              },
            },
            {
              name: 'Colors/Borders/Primary/color-border-primary-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-920',
              },
            },
            {
              name: 'Colors/Borders/Primary/color-border-primary-depth',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Black',
              },
            },
            {
              name: 'Colors/Borders/Primary/color-border-primary-subdued',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-900',
              },
            },
            {
              name: 'Colors/Borders/Primary/color-border-primary-inverse',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-50',
              },
            },
            {
              name: 'Colors/Borders/Cool/color-border-cool-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-600',
              },
            },
            {
              name: 'Colors/Borders/Cool/color-border-cool-emphasis',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-500',
              },
            },
            {
              name: 'Colors/Borders/Cool/color-border-cool-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-700',
              },
            },
            {
              name: 'Colors/Borders/Negative/color-border-negative-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Red/red-400',
              },
            },
            {
              name: 'Colors/Borders/Negative/color-border-negative-emphasis',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Red/red-600',
              },
            },
            {
              name: 'Colors/Borders/Negative/color-border-negative-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Red/red-900',
              },
            },
            {
              name: 'Colors/Borders/Positive/color-border-positive-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Green/green-400',
              },
            },
            {
              name: 'Colors/Borders/Positive/color-border-positive-emphasis',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Green/green-600',
              },
            },
            {
              name: 'Colors/Borders/Positive/color-border-positive-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Green/green-900',
              },
            },
            {
              name: 'Colors/Borders/Caution/color-border-caution-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Yellow/yellow-400',
              },
            },
            {
              name: 'Colors/Borders/Caution/color-border-caution-emphasis',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Yellow/yellow-600',
              },
            },
            {
              name: 'Colors/Borders/Caution/color-border-positive-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Yellow/yellow-900',
              },
            },
            {
              name: 'Colors/Borders/Information/color-border-info-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Blue/blue-400',
              },
            },
            {
              name: 'Colors/Borders/Information/color-border-info-emphasis',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Blue/blue-600',
              },
            },
            {
              name: 'Colors/Borders/Information/color-border-info-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Blue/blue-900',
              },
            },
            {
              name: 'Colors/Borders/Alert/color-border-alert-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Orange/orange-400',
              },
            },
            {
              name: 'Colors/Borders/Alert/color-border-alert-emphasis',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Orange/orange-600',
              },
            },
            {
              name: 'Colors/Borders/Alert/color-border-alert-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Orange/orange-900',
              },
            },
            {
              name: 'Colors/Borders/Innovative/color-border-innovative-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Purple/purple-400',
              },
            },
            {
              name: 'Colors/Borders/Innovative/color-border-innovative-emphasis',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Purple/purple-600',
              },
            },
            {
              name: 'Colors/Borders/Innovative/color-border-innovative-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Purple/purple-900',
              },
            },
            {
              name: 'Colors/Surface/color-surface-primary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-880',
              },
            },
            {
              name: 'Colors/Surface/color-surface-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-850',
              },
            },
            {
              name: 'Colors/Surface/color-surface-tertiary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-800',
              },
            },
            {
              name: 'Colors/Surface/color-surface-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-900',
              },
            },
            {
              name: 'Colors/Surface/color-surface-error',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-800',
              },
            },
            {
              name: 'Colors/Surface/color-surface-error-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Red/red-900',
              },
            },
            {
              name: 'Colors/Surface/color-surface-error-tertiary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-500',
              },
            },
            {
              name: 'Colors/Surface/color-surface-danger',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-800',
              },
            },
            {
              name: 'Colors/Surface/color-surface-danger-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Red/red-900',
              },
            },
            {
              name: 'Colors/Surface/color-surface-danger-tertiary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-500',
              },
            },
            {
              name: 'Colors/Surface/colors-surface-success',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-800',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-primary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'White',
              },
            },
            {
              name: 'Colors/Surface/colors-surface-success-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Green/green-900',
              },
            },
            {
              name: 'Colors/Surface/colors-surface-success-tertiary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-500',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-300',
              },
            },
            {
              name: 'Colors/Surface/color-surface-warn',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-800',
              },
            },
            {
              name: 'Colors/Surface/color-surface-warn-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Orange/orange-900',
              },
            },
            {
              name: 'Colors/Surface/color-surface-warn-tertiary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-500',
              },
            },
            {
              name: 'Colors/Surface/color-surface-alert',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-800',
              },
            },
            {
              name: 'Colors/Surface/color-surface-alert-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Yellow/yellow-900',
              },
            },
            {
              name: 'Colors/Surface/color-surface-alert-tertiary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-500',
              },
            },
            {
              name: 'Colors/Surface/color-surface-info',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-800',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-tertiary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-500',
              },
            },
            {
              name: 'Colors/Surface/color-surface-info-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Blue/blue-900',
              },
            },
            {
              name: 'Colors/Surface/color-surface-info-tertiary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-500',
              },
            },
            {
              name: 'Colors/Surface/color-surface-info-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Blue/blue-700',
              },
            },
            {
              name: 'Colors/Surface/color-surface-purple',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-800',
              },
            },
            {
              name: 'Colors/Surface/color-surface-purple-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Purple/purple-900',
              },
            },
            {
              name: 'Colors/Surface/color-surface-purple-tertiary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-500',
              },
            },
            {
              name: 'Colors/Surface/color-surface-hovered',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-800',
              },
            },
            {
              name: 'Colors/Surface/color-surface-overlay',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-900',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-error',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Red/red-500',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-error-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Red/red-400',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-success',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Green/green-600',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-success-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Green/green-400',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-warning',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Orange/orange-500',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-warning-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Orange/orange-400',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-alert',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Yellow/yellow-500',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-alert-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Yellow/yellow-400',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-info',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Blue/blue-500',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-info-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Blue/blue-400',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-purple',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Purple/purple-500',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-purple-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Purple/purple-400',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-800',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-inverse',
              type: 'color',
              isAlias: true,
              value: {
                name: 'Color/Neutral/neutral-950',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-overlay',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Foreground/color-fg-green',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Green/green-50',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-blue',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Foreground/color-fg-red',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Foreground/color-fg-orange',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Foreground/colo-fg-purple',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Foreground/color-fg-yellow',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Border/color-border-primary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-800',
              },
            },
            {
              name: 'Colors/Border/color-border-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-700',
              },
            },
            {
              name: 'Colors/Border/color-border-inverse',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-250',
              },
            },
            {
              name: 'Colors/Border/color-border-tertiary',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Border/color-border-focus',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-100',
              },
            },
            {
              name: 'Colors/Border/color-border-hovered',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-500',
              },
            },
            {
              name: 'Colors/Border/color-border-success',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Green/green-900',
              },
            },
            {
              name: 'Colors/Border/color-border-error',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Red/red-500',
              },
            },
            {
              name: 'Colors/Border/color-border-alert',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Yellow/yellow-900',
              },
            },
            {
              name: 'Colors/Border/color-border-warn',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Green/green-900',
              },
            },
            {
              name: 'Colors/Border/color-border-purple',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Purple/purple-700',
              },
            },
            {
              name: 'Colors/Border/color-border-divider',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-800',
              },
            },
            {
              name: 'Colors/Placeholder/color-placeholder-primary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-700',
              },
            },
            {
              name: 'Colors/Placeholder/color-placeholder-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-800',
              },
            },
            {
              name: 'Colors/Interactions/color-interaction-primary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Blue/blue-500',
              },
            },
            {
              name: 'Colors/Interactions/color-interaction-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Purple/purple-500',
              },
            },
            {
              name: 'Colors/Interactions/color-interaction-tertiary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Yellow/yellow-500',
              },
            },
            {
              name: 'Colors/Interactions/color-interaction-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-800',
              },
            },
            {
              name: 'Colors/Surface/color-surface-primary-inverse',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'White',
              },
            },
            {
              name: 'Colors/Surface/Color',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
          ],
        },
        {
          name: 'Light',
          variables: [
            {
              name: 'Colors/Background/Primary/color-bg-primary-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-25',
              },
            },
            {
              name: 'Colors/Background/Primary/color-bg-primary-depth',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'White',
              },
            },
            {
              name: 'Colors/Background/Primary/color-bg-primary-subdued',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-100',
              },
            },
            {
              name: 'Colors/Background/Primary/color-bg-primary-inverse',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-900',
              },
            },
            {
              name: 'Colors/Background/Cool/color-bg-cool-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-200',
              },
            },
            {
              name: 'Colors/Background/Cool/color-bg-cool-emphasis',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-100',
              },
            },
            {
              name: 'Colors/Background/Cool/color-bg-cool-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-300',
              },
            },
            {
              name: 'Colors/Background/Negative/color-bg-negative-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Red/red-500',
              },
            },
            {
              name: 'Colors/Background/Negative/color-bg-negative-emphasis',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Red/red-600',
              },
            },
            {
              name: 'Colors/Background/Negative/color-bg-negative-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Red/red-100',
              },
            },
            {
              name: 'Colors/Background/Positive/color-bg-positive-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Green/green-500',
              },
            },
            {
              name: 'Colors/Background/Positive/color-bg-positive-emphasis',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Green/green-600',
              },
            },
            {
              name: 'Colors/Background/Positive/color-bg-positive-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Green/green-100',
              },
            },
            {
              name: 'Colors/Background/Caution/color-bg-caution-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Yellow/yellow-500',
              },
            },
            {
              name: 'Colors/Background/Caution/color-bg-caution-emphasis',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Yellow/yellow-600',
              },
            },
            {
              name: 'Colors/Background/Caution/color-bg-caution-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Yellow/yellow-100',
              },
            },
            {
              name: 'Colors/Background/Information/color-bg-info-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Blue/blue-500',
              },
            },
            {
              name: 'Colors/Background/Information/color-bg-info-emphasis',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Blue/blue-600',
              },
            },
            {
              name: 'Colors/Background/Information/color-bg-info-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Blue/blue-100',
              },
            },
            {
              name: 'Colors/Background/Alert/color-bg-alert-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Orange/orange-500',
              },
            },
            {
              name: 'Colors/Background/Alert/color-bg-alert-emphasis',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Orange/orange-600',
              },
            },
            {
              name: 'Colors/Background/Alert/color-bg-alert-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Orange/orange-100',
              },
            },
            {
              name: 'Colors/Background/Innovative/color-bg-innovative-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Purple/purple-500',
              },
            },
            {
              name: 'Colors/Background/Innovative/color-bg-innovative-emphasis',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Purple/purple-600',
              },
            },
            {
              name: 'Colors/Background/Innovative/color-bg-innovative-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Purple/purple-100',
              },
            },
            {
              name: 'Colors/Surfaces/Primary/color-surface-primary-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'White',
              },
            },
            {
              name: 'Colors/Surfaces/Primary/color-surface-primary-depth',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'White',
              },
            },
            {
              name: 'Colors/Surfaces/Primary/color-surface-primary-subdued',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-75',
              },
            },
            {
              name: 'Colors/Surfaces/Primary/color-surface-primary-inverse',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-850',
              },
            },
            {
              name: 'Colors/Surfaces/Cool/color-surface-cool-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'White',
              },
            },
            {
              name: 'Colors/Surfaces/Cool/color-surface-cool-emphasis',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-100',
              },
            },
            {
              name: 'Colors/Surfaces/Cool/color-surface-cool-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-75',
              },
            },
            {
              name: 'Colors/Surfaces/Negative/color-surface-negative-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Red/red-50',
              },
            },
            {
              name: 'Colors/Surfaces/Negative/color-surface-negative-emphasis',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Red/red-100',
              },
            },
            {
              name: 'Colors/Surfaces/Negative/color-surface-negative-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-75',
              },
            },
            {
              name: 'Colors/Surfaces/Positive/color-surface-positive-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Green/green-50',
              },
            },
            {
              name: 'Colors/Surfaces/Positive/color-surface-positive-emphasis',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Green/green-100',
              },
            },
            {
              name: 'Colors/Surfaces/Positive/color-surface-positive-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-75',
              },
            },
            {
              name: 'Colors/Surfaces/Caution/color-surface-caution-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Yellow/yellow-50',
              },
            },
            {
              name: 'Colors/Surfaces/Caution/color-surface-caution-emphasis',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Yellow/yellow-100',
              },
            },
            {
              name: 'Colors/Surfaces/Caution/color-surface-caution-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-75',
              },
            },
            {
              name: 'Colors/Surfaces/Information/color-surface-info-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Blue/blue-50',
              },
            },
            {
              name: 'Colors/Surfaces/Information/color-surface-info-emphasis',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Blue/blue-100',
              },
            },
            {
              name: 'Colors/Surfaces/Information/color-surface-info-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-75',
              },
            },
            {
              name: 'Colors/Surfaces/Alert/color-surface-alert-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Orange/orange-50',
              },
            },
            {
              name: 'Colors/Surfaces/Alert/color-surface-alert-emphasis',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Orange/orange-100',
              },
            },
            {
              name: 'Colors/Surfaces/Alert/color-surface-alert-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-75',
              },
            },
            {
              name: 'Colors/Surfaces/Innovative/color-surface-innovative-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Purple/purple-50',
              },
            },
            {
              name: 'Colors/Surfaces/Innovative/color-surface-innovative-emphasis',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Purple/purple-100',
              },
            },
            {
              name: 'Colors/Surfaces/Innovative/color-bg-innovative-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-75',
              },
            },
            {
              name: 'Colors/Foregrounds/Primary/color-fg-primary-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-600',
              },
            },
            {
              name: 'Colors/Foregrounds/Primary/color-fg-primary-depth',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Black',
              },
            },
            {
              name: 'Colors/Foregrounds/Primary/color-fg-primary-subdued',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-400',
              },
            },
            {
              name: 'Colors/Foregrounds/Primary/color-fg-primary-inverse',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-100',
              },
            },
            {
              name: 'Colors/Foregrounds/Cool/color-fg-cool-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Black',
              },
            },
            {
              name: 'Colors/Foregrounds/Cool/color-fg-cool-emphasis',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Black',
              },
            },
            {
              name: 'Colors/Foregrounds/Cool/color-fg-cool-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-200',
              },
            },
            {
              name: 'Colors/Foregrounds/Negative/color-fg-negative-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Red/red-500',
              },
            },
            {
              name: 'Colors/Foregrounds/Negative/color-fg-negative-alt-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Red/red-500',
              },
            },
            {
              name: 'Colors/Foregrounds/Negative/color-fg-negative-emphasis',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Red/red-600',
              },
            },
            {
              name: 'Colors/Foregrounds/Negative/color-fg-negative-alt-emphasis',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Red/red-600',
              },
            },
            {
              name: 'Colors/Foregrounds/Negative/color-fg-negative-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Red/red-100',
              },
            },
            {
              name: 'Colors/Foregrounds/Negative/color-fg-negative-alt-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Red/red-100',
              },
            },
            {
              name: 'Colors/Foregrounds/Positive/color-fg-positive-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Green/green-500',
              },
            },
            {
              name: 'Colors/Foregrounds/Positive/color-fg-positive-alt-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Green/green-500',
              },
            },
            {
              name: 'Colors/Foregrounds/Positive/color-fg-positive-emphasis',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Green/green-600',
              },
            },
            {
              name: 'Colors/Foregrounds/Positive/color-fg-positive-alt-emphasis',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Green/green-600',
              },
            },
            {
              name: 'Colors/Foregrounds/Positive/color-fg-positive-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Green/green-100',
              },
            },
            {
              name: 'Colors/Foregrounds/Positive/color-fg-positive-alt-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Green/green-100',
              },
            },
            {
              name: 'Colors/Foregrounds/Caution/color-fg-caution-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Yellow/yellow-500',
              },
            },
            {
              name: 'Colors/Foregrounds/Caution/color-fg-caution-alt-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Yellow/yellow-500',
              },
            },
            {
              name: 'Colors/Foregrounds/Caution/color-fg-caution-emphasis',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Yellow/yellow-600',
              },
            },
            {
              name: 'Colors/Foregrounds/Caution/color-fg-caution-alt-emphasis',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Yellow/yellow-600',
              },
            },
            {
              name: 'Colors/Foregrounds/Caution/color-fg-caution-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Yellow/yellow-100',
              },
            },
            {
              name: 'Colors/Foregrounds/Caution/color-fg-positive-alt-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Yellow/yellow-100',
              },
            },
            {
              name: 'Colors/Foregrounds/Information/color-fg-info-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Blue/blue-500',
              },
            },
            {
              name: 'Colors/Foregrounds/Information/color-fg-info-alt-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Blue/blue-500',
              },
            },
            {
              name: 'Colors/Foregrounds/Information/color-fg-info-emphasis',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Blue/blue-600',
              },
            },
            {
              name: 'Colors/Foregrounds/Information/color-fg-info-alt-emphasis',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Blue/blue-600',
              },
            },
            {
              name: 'Colors/Foregrounds/Information/color-fg-info-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Blue/blue-100',
              },
            },
            {
              name: 'Colors/Foregrounds/Information/color-fg-info-alt-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Blue/blue-100',
              },
            },
            {
              name: 'Colors/Foregrounds/Alert/color-fg-alert-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Orange/orange-500',
              },
            },
            {
              name: 'Colors/Foregrounds/Alert/color-fg-alert-alt-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Orange/orange-500',
              },
            },
            {
              name: 'Colors/Foregrounds/Alert/color-fg-alert-emphasis',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Orange/orange-600',
              },
            },
            {
              name: 'Colors/Foregrounds/Alert/color-fg-alert-alt-emphasis',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Orange/orange-600',
              },
            },
            {
              name: 'Colors/Foregrounds/Alert/color-fg-alert-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Orange/orange-100',
              },
            },
            {
              name: 'Colors/Foregrounds/Alert/color-fg-alert-alt-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Orange/orange-100',
              },
            },
            {
              name: 'Colors/Foregrounds/Innovative/color-fg-innovative-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Purple/purple-500',
              },
            },
            {
              name: 'Colors/Foregrounds/Innovative/color-fg-innovative-alt-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Purple/purple-500',
              },
            },
            {
              name: 'Colors/Foregrounds/Innovative/color-fg-innovative-emphasis',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Purple/purple-600',
              },
            },
            {
              name: 'Colors/Foregrounds/Innovative/color-fg-innovative-alt-emphasis',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Purple/purple-600',
              },
            },
            {
              name: 'Colors/Foregrounds/Innovative/color-fg-innovative-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Purple/purple-100',
              },
            },
            {
              name: 'Colors/Foregrounds/Innovative/color-fg-innovative-alt-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Purple/purple-100',
              },
            },
            {
              name: 'Colors/Borders/Primary/color-border-primary-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-25',
              },
            },
            {
              name: 'Colors/Borders/Primary/color-border-primary-depth',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'White',
              },
            },
            {
              name: 'Colors/Borders/Primary/color-border-primary-subdued',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-150',
              },
            },
            {
              name: 'Colors/Borders/Primary/color-border-primary-inverse',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-900',
              },
            },
            {
              name: 'Colors/Borders/Cool/color-border-cool-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-200',
              },
            },
            {
              name: 'Colors/Borders/Cool/color-border-cool-emphasis',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-100',
              },
            },
            {
              name: 'Colors/Borders/Cool/color-border-cool-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-300',
              },
            },
            {
              name: 'Colors/Borders/Negative/color-border-negative-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Red/red-300',
              },
            },
            {
              name: 'Colors/Borders/Negative/color-border-negative-emphasis',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Red/red-400',
              },
            },
            {
              name: 'Colors/Borders/Negative/color-border-negative-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Red/red-900',
              },
            },
            {
              name: 'Colors/Borders/Positive/color-border-positive-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Green/green-300',
              },
            },
            {
              name: 'Colors/Borders/Positive/color-border-positive-emphasis',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Green/green-400',
              },
            },
            {
              name: 'Colors/Borders/Positive/color-border-positive-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Green/green-900',
              },
            },
            {
              name: 'Colors/Borders/Caution/color-border-caution-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Yellow/yellow-300',
              },
            },
            {
              name: 'Colors/Borders/Caution/color-border-caution-emphasis',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Yellow/yellow-400',
              },
            },
            {
              name: 'Colors/Borders/Caution/color-border-positive-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Yellow/yellow-900',
              },
            },
            {
              name: 'Colors/Borders/Information/color-border-info-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Blue/blue-300',
              },
            },
            {
              name: 'Colors/Borders/Information/color-border-info-emphasis',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Blue/blue-400',
              },
            },
            {
              name: 'Colors/Borders/Information/color-border-info-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Blue/blue-900',
              },
            },
            {
              name: 'Colors/Borders/Alert/color-border-alert-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Orange/orange-300',
              },
            },
            {
              name: 'Colors/Borders/Alert/color-border-alert-emphasis',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Orange/orange-400',
              },
            },
            {
              name: 'Colors/Borders/Alert/color-border-alert-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Orange/orange-900',
              },
            },
            {
              name: 'Colors/Borders/Innovative/color-border-innovative-base',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Purple/purple-300',
              },
            },
            {
              name: 'Colors/Borders/Innovative/color-border-innovative-emphasis',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Purple/purple-400',
              },
            },
            {
              name: 'Colors/Borders/Innovative/color-border-innovative-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Purple/purple-900',
              },
            },
            {
              name: 'Colors/Surface/color-surface-primary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'White',
              },
            },
            {
              name: 'Colors/Surface/color-surface-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'White',
              },
            },
            {
              name: 'Colors/Surface/color-surface-tertiary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-75',
              },
            },
            {
              name: 'Colors/Surface/color-surface-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-100',
              },
            },
            {
              name: 'Colors/Surface/color-surface-error',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Red/red-50',
              },
            },
            {
              name: 'Colors/Surface/color-surface-error-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Red/red-50',
              },
            },
            {
              name: 'Colors/Surface/color-surface-error-tertiary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Red/red-500',
              },
            },
            {
              name: 'Colors/Surface/color-surface-danger',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Red/red-50',
              },
            },
            {
              name: 'Colors/Surface/color-surface-danger-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Red/red-50',
              },
            },
            {
              name: 'Colors/Surface/color-surface-danger-tertiary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Red/red-500',
              },
            },
            {
              name: 'Colors/Surface/colors-surface-success',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Green/green-50',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-primary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-950',
              },
            },
            {
              name: 'Colors/Surface/colors-surface-success-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Green/green-50',
              },
            },
            {
              name: 'Colors/Surface/colors-surface-success-tertiary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Green/green-500',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-700',
              },
            },
            {
              name: 'Colors/Surface/color-surface-warn',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Orange/orange-50',
              },
            },
            {
              name: 'Colors/Surface/color-surface-warn-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Orange/orange-50',
              },
            },
            {
              name: 'Colors/Surface/color-surface-warn-tertiary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Orange/orange-500',
              },
            },
            {
              name: 'Colors/Surface/color-surface-alert',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Yellow/yellow-50',
              },
            },
            {
              name: 'Colors/Surface/color-surface-alert-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Yellow/yellow-50',
              },
            },
            {
              name: 'Colors/Surface/color-surface-alert-tertiary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Yellow/yellow-600',
              },
            },
            {
              name: 'Colors/Surface/color-surface-info',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Blue/blue-50',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-tertiary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-400',
              },
            },
            {
              name: 'Colors/Surface/color-surface-info-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Blue/blue-50',
              },
            },
            {
              name: 'Colors/Surface/color-surface-info-tertiary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Blue/blue-500',
              },
            },
            {
              name: 'Colors/Surface/color-surface-info-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Blue/blue-700',
              },
            },
            {
              name: 'Colors/Surface/color-surface-purple',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Purple/purple-50',
              },
            },
            {
              name: 'Colors/Surface/color-surface-purple-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Purple/purple-50',
              },
            },
            {
              name: 'Colors/Surface/color-surface-purple-tertiary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Purple/purple-500',
              },
            },
            {
              name: 'Colors/Surface/color-surface-hovered',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-150',
              },
            },
            {
              name: 'Colors/Surface/color-surface-overlay',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-100',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-error',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Red/red-500',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-error-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Red/red-900',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-success',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Green/green-600',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-success-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Green/green-900',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-warning',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Orange/orange-500',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-warning-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Orange/orange-900',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-alert',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Yellow/yellow-600',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-alert-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Yellow/yellow-900',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-info',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Blue/blue-500',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-info-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Blue/blue-900',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-purple',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Purple/purple-500',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-purple-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Purple/purple-900',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-250',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-inverse',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'White',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-overlay',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Foreground/color-fg-green',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Green/green-50',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-blue',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Blue/blue-50',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-red',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Red/red-50',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-orange',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Orange/orange-50',
              },
            },
            {
              name: 'Colors/Foreground/colo-fg-purple',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Purple/purple-50',
              },
            },
            {
              name: 'Colors/Foreground/color-fg-yellow',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Yellow/yellow-50',
              },
            },
            {
              name: 'Colors/Border/color-border-primary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-100',
              },
            },
            {
              name: 'Colors/Border/color-border-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-150',
              },
            },
            {
              name: 'Colors/Border/color-border-inverse',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-500',
              },
            },
            {
              name: 'Colors/Border/color-border-tertiary',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
            {
              name: 'Colors/Border/color-border-focus',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Blue/blue-500',
              },
            },
            {
              name: 'Colors/Border/color-border-hovered',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Blue/blue-500',
              },
            },
            {
              name: 'Colors/Border/color-border-success',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Green/green-100',
              },
            },
            {
              name: 'Colors/Border/color-border-error',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Red/red-500',
              },
            },
            {
              name: 'Colors/Border/color-border-alert',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Yellow/yellow-800',
              },
            },
            {
              name: 'Colors/Border/color-border-warn',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Orange/orange-800',
              },
            },
            {
              name: 'Colors/Border/color-border-purple',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Purple/purple-800',
              },
            },
            {
              name: 'Colors/Border/color-border-divider',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-100',
              },
            },
            {
              name: 'Colors/Placeholder/color-placeholder-primary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-150',
              },
            },
            {
              name: 'Colors/Placeholder/color-placeholder-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-100',
              },
            },
            {
              name: 'Colors/Interactions/color-interaction-primary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Blue/blue-500',
              },
            },
            {
              name: 'Colors/Interactions/color-interaction-secondary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Purple/purple-500',
              },
            },
            {
              name: 'Colors/Interactions/color-interaction-tertiary',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Yellow/yellow-600',
              },
            },
            {
              name: 'Colors/Interactions/color-interaction-muted',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Color/Neutral/neutral-75',
              },
            },
            {
              name: 'Colors/Surface/color-surface-primary-inverse',
              type: 'color',
              isAlias: true,
              value: {
                collection: 'Primitives ( Colors )',
                name: 'Black',
              },
            },
            {
              name: 'Colors/Surface/Color',
              type: 'color',
              isAlias: false,
              value: '#FFFFFF',
            },
          ],
        },
      ],
    },
  ],
};
