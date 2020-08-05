// Libs
import * as React from 'react';

// Types
import { IUser } from 'types/users';

// Common
import { getName } from 'common/users';

// Components
import { Avatar } from 'components/photos';

// Rest
import * as FilesService from 'rest/files';

interface IProps {
  user: IUser;
  readOnly?: boolean;
  small?: boolean;
  onUpdate?: (user: IUser) => void;
}

export class Photo extends React.Component<IProps> {
  public upload: HTMLElement | null = null;

  public render() {
    const { pic } = this.props.user;

    const title = getName(this.props.user);

    return (
      <>
        <input id="myInput"
          type="file"
          ref={ref => this.upload = ref}
          style={{display: 'none'}}
          onChange={this.handleUpload}
        />

        <Avatar src={pic} small={this.props.small} active={this.props.readOnly} alt={title} onClick={this.handleClick} />
      </>
    );
  };

  private handleClick = () => {
    if (!this.props.onUpdate || this.props.readOnly) {
      return window.open(this.props.user.pic, '_blank');
    }

    if (this.upload === null) {
      return;
    }

    this.upload.click();
  };

  private handleUpload = (e: React.FormEvent<HTMLInputElement>) => {
    const { onUpdate } = this.props;

    if (!onUpdate) {
      return;
    }

    const file = e.currentTarget.files && e.currentTarget.files[0];

    e.currentTarget.value = '';

    if (file) {
      FilesService.add(file, undefined, true).then(id => {
        onUpdate({ pic: '/files/' + id, photos: [ ...this.props.user.photos || [], '/files/' + id ] });
      });
    }
  };
}