import React from "react";

import tailwind from "tailwind-rn";
import styled from "styled-components/native";

const CardContainer = styled.View`
  ${tailwind("flex flex-wrap place-items-center h-screen")}
`;

const CardInnerContainer = styled.View`
  ${tailwind(
    "overflow-hidden shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-5 hover:shadow-2xl rounded-lg h-90 w-60 md:w-80 cursor-pointer m-auto"
  )}
`;

const CardPressable = styled.View`
  ${tailwind("w-full block h-full")}
`;

const ImageCover = styled.Image`
  ${tailwind("max-h-40 w-10 h-40 w-full object-cover")}
`;

const ProfileImage = styled.Image`
  ${tailwind("w-10 h-10 object-cover rounded-full")}
`;

const Content = styled.View`
  ${tailwind("bg-white w-full p-4")}
`;

const Title = styled.Text`
  ${tailwind("text-indigo-500 text-2xl font-medium")}
`;

const Subtitle = styled.Text`
  ${tailwind("text-gray-800 text-sm font-medium mb-2")}
`;

const MainText = styled.Text`
  ${tailwind("text-gray-600 font-light text-md")}
`;

const TextPressable = styled.Text`
  ${tailwind("inline-flex text-indigo-500")}
`;

const Tag = styled.Text`
  ${tailwind("m-1 px-2 py-1 rounded bg-indigo-500 text-white")}
`;

const TagsContainer = styled.View`
  ${tailwind(
    "flex flex-wrap justify-starts items-center py-3 border-gray-200 border-b-2 text-xs text-white font-medium"
  )}
`;

const ProfileContainer = styled.View`
  ${tailwind("flex items-center mt-2")}
`;

const ProfileContent = styled.View`
  ${tailwind("pl-3")}
`;

const ProfileName = styled.Text`
  ${tailwind("font-medium")}
`;

const ProfileRole = styled.Text`
  ${tailwind("text-gray-600 text-sm")}
`;

const Card = () => {
  return (
    <CardContainer>
      <CardInnerContainer>
        <CardPressable>
          <ImageCover
            source={{
              uri: "https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80",
            }}
          />
          <Content>
            <Title>Should You Get Online Education?</Title>
            <Subtitle>A comprehensive guide about online education.</Subtitle>
            <MainText>
              It is difficult to believe that we have become so used to having
              instant access to information at...
              <TextPressable>Read More</TextPressable>
            </MainText>
            <TagsContainer>
              <Tag>#online</Tag>
              <Tag>#internet</Tag>
              <Tag>#education</Tag>
            </TagsContainer>
            <ProfileContainer>
              <ProfileImage
                accessible
                accessibilityLabel="User avatar"
                source={{
                  uri: "https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=200",
                }}
              />

              <ProfileContent>
                <ProfileName>Tom Castro</ProfileName>
                <ProfileRole>CTO of Supercars</ProfileRole>
              </ProfileContent>
            </ProfileContainer>
          </Content>
        </CardPressable>
      </CardInnerContainer>
    </CardContainer>
  );
};

export default Card;
