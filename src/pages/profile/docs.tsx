// Libs
import * as React from 'react';
import styled from 'styled-components';

// Types
import { IUser } from 'types/users';

// Components
import { Row, Column } from 'components/styled';
import { Text, FadedTiny, H2, AddLink, ALink } from 'components/inline';

// Rest
import * as FilesService from 'rest/files';

// Assets
import IconAdd from 'assets/icons/icons-add.svg';

// Assets
import { ReactComponent as IconJPG } from 'assets/icons/files-jpg.svg';
import { ReactComponent as IconMOV } from 'assets/icons/files-mov.svg';
import { ReactComponent as IconPPT } from 'assets/icons/files-ppt.svg';
import { ReactComponent as IconRemove } from 'assets/icons/icons-delete.svg';

const files = {
  'image/jpeg': IconJPG,
}

interface IProps {
  user: IUser;
  readOnly?: boolean;
  onUpdate?: (user: IUser) => void;
}

export class Docs extends React.Component<IProps> {
  public upload: HTMLElement | null = null;

  public render() {
    return (
      <>
        <Column>
          <Row style={{ justifyContent: "space-between", alignItems: "center" }}>
            <H2>Мультимедиа</H2>

            {!this.props.readOnly && (
              <AddLink onClick={this.handleClick} />
            )}
          </Row>

          <Column style={{ margin: '0.5rem 0 1.5rem 0' }}>
            <input id="myInput"
              type="file"
              ref={ref => this.upload = ref}
              style={{display: 'none'}}
              onChange={this.handleUpload}
            />

            <List readOnly={this.props.readOnly} data={this.props.user.docs} onDelete={this.handleDelete} />
          </Column>
        </Column>
        
      </>
    );
  };

  private handleClick = () => {
    if (this.upload === null) {
      return;
    }

    this.upload.click();
  };

  private handleUpload = (e: React.FormEvent<HTMLInputElement>) => {
    const { onUpdate } = this.props;

    const file = e.currentTarget.files && e.currentTarget.files[0];

    e.currentTarget.value = '';

    if (file && onUpdate) {
      FilesService.add(file).then(id => {
        onUpdate({ docs: [ ...this.props.user.docs || [], '/files/' + id ] });
      });
    }
  };

  private handleDelete = (id: string) => {
    const { onUpdate } = this.props;

    if (onUpdate) {
      FilesService.remove(id).then(() => {
        onUpdate({ docs: this.props.user.docs && this.props.user.docs.filter(i => i !== '/files/' + id) });
      });
    }
  };
}

export class List extends React.Component<{ data?: string[]; onDelete?: (id: string) => void; readOnly?: boolean; }> {
  public render() {
    return (
      <>
        <Column>
          {this.props.data && this.props.data.map(i => (
            <File id={i} onDelete={this.props.onDelete} readOnly={this.props.readOnly} />
          ))}
        </Column>
      </>
    );
  };
}

interface IFileState {
  file?: { name?: string, size?: number, type?: string };
}

export class File extends React.Component<{ id: string; onDelete?: (id: string) => void; readOnly?: boolean; }, IFileState> {
  public state: IFileState = {};

  public componentDidMount() {
    this.handleLoad();
  }

  public render() {
    return (
      <>
        <Row style={{
          borderRadius: '0.1875rem',
          backgroundColor: '#ffffff',
          border: '0.0625rem solid rgb(197, 197, 197)',
          padding: '1rem',
          alignItems: 'center',
          cursor: 'pointer'
        }}>
          {this.state.file && (
            <>
              <Column style={{ marginRight: "1rem" }}>
                <IconJPG style={{ width: "2rem" }} />
              </Column>

              <Column style={{ flexGrow: 1, marginRight: "1rem" }}>
                <ALink target="_blank" to={this.props.id}>{this.state.file.name}</ALink>
                <FadedTiny>{this.state.file.type} | {this.state.file.size} Байт</FadedTiny>
              </Column>
              
              {!this.props.readOnly && (
                <Column>
                  <IconRemove style={{ cursor: "pointer", width: "1.5rem" }} onClick={this.handleDelete} />
                </Column>
              )}
            </>
          )}
        </Row>
      </>
    );
  };

  private handleLoad = () => {
    FilesService.info(this.props.id.split('/')[2]).then(file => {
      this.setState({ file });
    });
  };

  private handleDelete = () => {
    if (this.props.onDelete) {
      this.props.onDelete(this.props.id.split('/')[2]);
    }
  };
}