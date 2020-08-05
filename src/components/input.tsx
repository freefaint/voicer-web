// Libs
import * as React from 'react';

// Components
import { Column, Label, Field, Row, MultiLine } from 'components/styled';
import { Text } from './inline';

interface IInputProps {
  invalid?: boolean;
}

interface IInputState {
  focused?: boolean;
  filled?: boolean;
}

export class Input extends React.Component<React.HTMLProps<HTMLInputElement> & IInputProps, IInputState> {
  public state: IInputState = { filled: !!this.props.value };

  public render() {
    const { placeholder, ref, as, ...rest } = this.props;

    return (
      <Column style={{
        backgroundColor: '#fff',
        border: '0.0625rem solid #c5c5c5',
        borderRadius: '0.1875rem',
        padding: '0.5rem 0.625rem',
      }}>
        {placeholder && (
          <Label {...this.state} invalid={this.props.invalid}>
            {placeholder}
          </Label>
        )}

        <Field {...rest} onFocus={this.handleFocus} onBlur={this.handleBlur} onChange={this.handleChange} />
      </Column>
    );
  };

  private handleFocus = () => {
    this.setState({ focused: true });
  };

  private handleBlur = () => {
    this.setState({ focused: false });
  };

  private handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    this.setState({ filled: !!value });

    if (this.props.onChange) {
      this.props.onChange(e);
    }
  };
}

export class Radio extends React.Component<React.HTMLProps<HTMLInputElement>> {
  public render() {
    const { placeholder, ref, as, ...rest } = this.props;

    return (
      <Row style={{ margin: "0 1rem 0 0" }}>
        <Text>
          <input disabled={this.props.readOnly} {...rest} onChange={this.handleChange} type="radio" />
        </Text>

        <Text style={{ margin: "0 0 0 0.5rem" }}>{placeholder}</Text>
      </Row>
    );
  };

  private handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    if (this.props.onChange) {
      this.props.onChange(e);
    }
  };
}

export class TextArea extends React.Component<React.HTMLProps<HTMLTextAreaElement> & IInputProps, IInputState> {
  public state: IInputState = { filled: !!this.props.value };

  public render() {
    const { placeholder, value, ref, as, ...rest } = this.props;

    return (
      <Column style={{
        backgroundColor: '#fff',
        border: '0.0625rem solid #c5c5c5',
        borderRadius: '0.1875rem',
        padding: '0.5rem 0.625rem',
      }}>
        {placeholder && (
          <Label {...this.state} invalid={this.props.invalid}>
            {placeholder}
          </Label>
        )}

        <MultiLine rows={4} {...rest} onFocus={this.handleFocus} onBlur={this.handleBlur} onChange={this.handleChange}>{value}</MultiLine>
      </Column>
    );
  };

  private handleFocus = () => {
    this.setState({ focused: true });
  };

  private handleBlur = () => {
    this.setState({ focused: false });
  };

  private handleChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const { value } = e.currentTarget;

    this.setState({ filled: !!value });

    if (this.props.onChange) {
      this.props.onChange(e);
    }
  };
}