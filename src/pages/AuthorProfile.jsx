import { Card, CardContent } from "@mui/material";

export const AuthorProfile = () => {
  const cardStyle = {
    marginTop: "15px",
  };

  return (
    <>
      <Card style={cardStyle}>
        <CardContent
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h3>プロフィール</h3>
          <a style={{ marginBottom: "8px" }} href="#">
            <strong>クレヘイ</strong>
          </a>
          <img
            src="/umineko.png"
            alt="Dummy Icon"
            width={100}
            height={100}
            style={{
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <p style={{ marginBottom: "0" }}>
            【筆者の経歴】<br></br>
            新卒でSESのエンジニアとして入社→アフィリエイト系のシステム会社→外食産業系のSassを提供している会社に転職
          </p>
        </CardContent>
      </Card>
    </>
  );
};
