import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    console.log(error, errorInfo);
    // You can also log the error to an error reporting service
    //   logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div
          style={{
            height: "100vh",
            overflow: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <img
              height={144}
              src={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuFjSLXhHu9sgskzDRTBLIiNJnEKEOMU11quXGNxAbID1u4cK9E2CZUS05on5sK2SpSjI&usqp=CAU"
              }
              alt="Falling"
            />
            <h3>Something went wrong</h3>
            <p>
              Try refreshing the page, Check it later, or contact support for
              help
            </p>

            <details style={{ whiteSpace: "pre-wrap" }}>
              {this?.state?.error && this?.state?.error?.toString()}
            </details>
            <br />
            {this.props.extraRender && <this.props.extraRender />}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
