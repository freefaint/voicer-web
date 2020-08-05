// Libs
import * as React from 'react';
import styled from 'styled-components';

// Types
import { IUser } from 'types/users';

// Common
import { getName } from 'common/users';

// Components
import { Avatar } from 'components/photos';
import { EmptyList, ColumnSpace } from 'components/blocks';
import { Row, Column } from 'components/styled';

// Rest
import * as FilesService from 'rest/files';

// Assets
import IconAdd from 'assets/icons/icons-add.svg';

interface IProps {
  me?: IUser;
  user: IUser;
  readOnly?: boolean;
  onUpdate?: (user: IUser) => void;
}

interface IState {
  percent?: number;
}

export class Video extends React.Component<IProps, IState> {
  public state: IState = {};

  public render() {
    return (
      <>
        <ColumnSpace>
          <List percent={this.state.percent} readOnly={this.props.readOnly} data={this.props.user.videos} onUpload={this.handleUpload} />
        </ColumnSpace>
      </>
    );
  };

  private handleUpload = (file: File) => {
    const { onUpdate } = this.props;

    if (!onUpdate) {
      return;
    }

    FilesService.add(file, this.handleProgress).then(id => {
      this.setState({ percent: undefined });

      onUpdate({ videos: [ ...this.props.user.videos || [], '/files/' + id ] });
    });
  };

  private handleProgress = (percent: number) => {
    this.setState({ percent });
  };
}

const Circle = styled.div`
  cursor: pointer;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background: #e2e2e2 url(${IconAdd}) center center no-repeat;
`;

export class List extends React.Component<{ data?: string[]; percent?: number; onUpload: (file: File) => void; readOnly?: boolean; }> {
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
        
        <Column style={{}}>
          {this.props.data && !this.props.data.length && (
            <EmptyList />
          )}

          {this.props.data && this.props.data.map(i => (
            <Column style={{ marginRight: "1rem" }}>
              <video controls={true} width="320" height="240">
                <source src={i} />
              </video>
            </Column>
          ))}
          
          {!this.props.readOnly && <Circle onClick={!this.props.percent ? this.handleClick : undefined} />}
          
          {this.props.percent && <>{this.props.percent}%</>}
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
    const file = e.currentTarget.files && e.currentTarget.files[0];

    e.currentTarget.value = '';

    if (file) {
      this.props.onUpload(file);
    }
  };
}