import React, { useContext } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import PeopleAltSharpIcon from "@mui/icons-material/PeopleAltSharp";
import PushPinSharpIcon from "@mui/icons-material/PushPinSharp";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import {
  Route,
  Switch,
  useHistory,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import { SendMessages } from "./Operations";
import { StateContext } from "../../../state/State";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import "react-chat-elements/dist/main.css";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import {
  ChatList,
  MessageBox,
  Navbar,
  SideBar,
  MessageList,
  Button,
  Input,
} from "react-chat-elements";

export default function NotifyContainer() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path}>
        <FolderList />
      </Route>
      <Route exact path={`${path}/:title`}>
        <MessageDetail />
      </Route>
    </Switch>
  );
}

function FolderList() {
  const { url } = useRouteMatch();
  const { push } = useHistory();
  const { messages } = useContext(StateContext);
  const unReadNotes =
    messages?.filter((m) => !m.isRead && m.ctx === "message") || [];
  return (
    <Box>
      <Box sx={{ textAlign: "center", my: 2 }}>
        <Typography variant="h6">Notifications</Typography>
      </Box>
      <ChatList
        className="chat-list"
        onClick={(chat) => push(`${url}/${chat?.title}}`)}
        dataSource={["Officials", "Coordinators", "Members", "Candidates"].map(
          (text, i) => ({
            avatar:
              "https://www.iconpacks.net/icons/1/free-user-group-icon-296-thumb.png",
            alt: text,
            title: text,
            subtitle: `Messages to ${text}`,
            date: new Date(),
            unread: i,
          })
        )}
      />
      <List sx={{ width: "100%", mt: 3 }}>
        {unReadNotes.map((text, index) => (
          <ListItemButton
            key={index}
            onClick={() => push(`${url}/new?ctx=${text.message.subject}`)}
            dense
          >
            <ListItemAvatar>
              <Avatar>
                <PeopleAltSharpIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={text.message.subject}
              secondary={text.message.body}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}

function MessageDetail() {
  const messageListReferance = React.createRef();
  const inputReferance = React.createRef();

  const { title } = useParams();

  return (
    <Box sx={{ mt: 2 }}>
      <Box sx={{ mb: 2 }}>
        <Navbar
          left={
            <div>
              <Avatar>
                <PeopleAltIcon />
              </Avatar>
              <Typography></Typography>
            </div>
          }
          right={
            <div>
              <IconButton>
                <VideoCallIcon />
              </IconButton>
            </div>
          }
          center={<div>{title}</div>}
        />
      </Box>
      <Box sx={{ maxHeight: "66vh", overflow: "auto" }}>
        <MessageList
          referance={messageListReferance}
          className="message-list"
          lockable={true}
          toBottomHeight={"100%"}
          dataSource={[
            {
              position: "right",
              type: "text",
              text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
              date: new Date(),
            },
            {
              position: "left",
              type: "text",
              text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
              date: new Date(),
            },
          ]}
        />
      </Box>
      <Box>
        <Input
          autofocus
          referance={inputReferance}
          placeholder="Type here..."
          multiline={true}
          rightButtons={
            <Button color="white" backgroundColor="black" text="Send" />
          }
        />
      </Box>
    </Box>
  );
}
