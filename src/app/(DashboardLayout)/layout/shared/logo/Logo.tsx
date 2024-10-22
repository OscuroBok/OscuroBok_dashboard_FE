import { useSelector } from "@/store/hooks";
import Link from "next/link";
import { styled } from "@mui/material/styles";
import { AppState } from "@/store/store";
import Image from "next/image";
import { Typography } from "@mui/material";

const Logo = () => {
  const customizer = useSelector((state: AppState) => state.customizer);
  const LinkStyled = styled(Link)(() => ({
    height: customizer.TopbarHeight,
    width: customizer.isCollapse ? "80px" : "250px",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    textDecoration: "none", 
  }));

  if (customizer.activeDir === "ltr") {
    return (
      <LinkStyled href="/">
        {customizer.activeMode === "dark" ? (
          <>

            <Image
              src={"/images/logo-oscurobook.png"}
              alt="logo"
              
              height={customizer.TopbarHeight}
              width={80}
              priority
            />
            <Typography variant="h2" sx={{color: customizer.activeMode === "dark" ? "white" : "black" }}  > oscurobook</Typography>
          </>
        ) : (
          <>

            <Image
              src={"/images/logo-oscurobook.png"}
              alt="logo"
              // sx={{ marginLeft: "8px", color: customizer.activeMode === "dark" ? "white" : "black" }}
              height={customizer.TopbarHeight}
              width={80}
              priority
            />
            <Typography variant="h2" sx={{ color: customizer.activeMode === "dark" ? "white" : "black" }} > oscurobook</Typography>
          </>
        )}
      </LinkStyled>
    );
  }

  return (
    <LinkStyled href="/">
      {customizer.activeMode === "dark" ? (
        <Image
          src="/images/logos/dark-rtl-logo.svg"
          alt="logo"
          height={customizer.TopbarHeight}
          width={174}
          priority
        />
      ) : (
        <Image
          src="/images/logos/light-logo-rtl.svg"
          alt="logo"
          height={customizer.TopbarHeight}
          width={174}
          priority
        />
      )}
    </LinkStyled>
  );
};

export default Logo;
