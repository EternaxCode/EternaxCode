# 02. Authentication

## Current State
**Status**: Not Implemented / Not Required

The current version of the project is a static / pure frontend presentation layer. There is no user authentication, login flow, or protected routes.

## Future Considerations
If authentication is required in the future:
1.  **Solution**: Consider Firebase Auth or NextAuth.js.
2.  **State Management**: Use a React Context to manage the user session.
3.  **Protected Routes**: Implement a Higher Order Component (HOC) or check in `getServerSideProps` / `middleware`.
