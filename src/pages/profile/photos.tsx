// Libs
import * as React from 'react';
import styled from 'styled-components';

// Types
import { IUser } from 'types/users';

// Common
import { getName } from 'common/users';

// Components
import { Avatar } from 'components/photos';
import { Row, Column } from 'components/styled';

// Rest
import * as FilesService from 'rest/files';

// Assets
import IconAdd from 'assets/icons/icons-add.svg';

interface IProps {
  user: IUser;
  readOnly?: boolean;
  onUpdate?: (user: IUser) => void;
}

export class Photos extends React.Component<IProps> {
  public render() {
    return (
      <>
        <List onDelete={this.handleDelete} readOnly={this.props.readOnly} data={this.props.user.photos} now={this.props.user.pic} onSelect={this.handleSelect} onUpload={this.handleUpload} />
      </>
    );
  };

  private handleSelect = (photo: string) => {
    const { onUpdate } = this.props;

    if (!onUpdate) {
      return;
    }
    
    onUpdate({ pic: photo });
  };

  private handleUpload = (file: File) => {
    const { onUpdate } = this.props;

    if (!onUpdate) {
      return;
    }

    FilesService.add(file, undefined, true).then(id => {
      onUpdate({ photos: [ ...this.props.user.photos || [], '/files/' + id ] });
    });
  };

  private handleDelete = (i: string) => {
    const { onUpdate } = this.props;

    if (!onUpdate) {
      return;
    }

    FilesService.remove(i.split('/')[2]).then(() => {
      onUpdate({ photos: this.props.user.photos && this.props.user.photos.filter(j => j !== i) });
    });
  };
}

const Circle = styled.div`
  cursor: pointer;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background: #e2e2e2 url(${IconAdd}) center center no-repeat;
`;

export class List extends React.Component<{ now?: string; data?: string[]; onUpload: (file: File) => void; onDelete: (i: string) => void; onSelect: (photo: string) => void; readOnly?: boolean; }> {
  public upload: HTMLElement | null = null;

  public render() {
    return (
      <>
        <input id="myInput"
          type="file"
          ref={ref => this.upload = ref}
          style={{display: 'none'}}
          onChange={this.handleUpload}
        />
        
        <Row>
          {this.props.data && this.props.data.map(i => (
            <Column style={{ marginRight: "1rem", position: 'relative' }}>
              <Avatar active={!this.props.readOnly && !!this.props.onSelect} main={i === this.props.now} small={true} src={i} onClick={this.handleSelect(i)} />

              {!this.props.readOnly && (
                <div style={{ borderRadius: '50%', backgroundColor: '#f00', color: '#fff', cursor: 'pointer', position: 'absolute', top: '-0.5rem', right: '-0.5rem', lineHeight: '1rem', width: '1rem', height: '1rem', textAlign: 'center' }} onClick={() => this.props.onDelete(i)}>&times;</div>
              )}
            </Column>
          ))}
          
          {!this.props.readOnly && <Circle onClick={this.handleClick} />}
        </Row>
      </>
    );
  };

  private handleSelect = (photo: string) => () => {
    this.props.onSelect(photo);
  };

  private handleClick = () => {
    if (this.upload === null) {
      return;
    }

    this.upload.click();
  };

  private handleUpload = (e: React.FormEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files && e.currentTarget.files[0];

    e.currentTarget.value = '';

    if (file) {
      this.props.onUpload(file);
    }
  };
}