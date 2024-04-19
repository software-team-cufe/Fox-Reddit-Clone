// import { render, screen, fireEvent } from '@testing-library/react';
//  import CreatePostPage from './CreatePostPage'
// const React = require('react');


// // Typing more than 300 characters in the title input does not update the value of props.PostTitle.
// it('should not update props.PostTitle when typing more than 300 characters in the title input', () => {
//     // Arrange
//     const setPostTitle = jest.fn();
//     const props = {
//         PostTitle: '',
//         SetPostTitle: setPostTitle,
//         PostFunc: jest.fn(),
//         Poll3: "jj", SetPoll3: jest.fn(),
//         VoteLength: 1, SetVoteLength: jest.fn(),
//         Poll1: "k", SetPoll1: jest.fn(), Poll2: "{Poll2}", SetPoll2: jest.fn(),
//         VideoOrImageSrc: null, SetVideoOrImageSrc: jest.fn(),
//         PostNotifications: false, SetPostNotifications: jest.fn(),
//         Spoiler: false, SetSpoiler: jest.fn(),
//         NFSW: false, SetNFSW: jest.fn(),
//         PostURL: "{PostURL}", SetPostURL: jest.fn(),

//         PostText: "{PostText}", SetPostText: jest.fn(), SelectedCom: null
//     };

//     // Act
//     render(<TypingArea {...props} />);
//     fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'a'.repeat(301) } });

//     // Assert
//     expect(setPostTitle).not.toHaveBeenCalled();
// });