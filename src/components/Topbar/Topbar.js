import {
    TopBar,
    ActionList,
    Icon,
    VisuallyHidden,
    Frame,
    Heading,
  } from '@shopify/polaris';
  import {ArrowLeftMinor, QuestionMarkMajor} from '@shopify/polaris-icons';
  import {useState, useCallback} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

  
  function TopNavbar(props) {
    const navigate = useNavigate();
    const authUsername  = useSelector((state) => state.storeWork.username);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isSecondaryMenuOpen, setIsSecondaryMenuOpen] = useState(false);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [searchValue, setSearchValue] = useState('');
  
    const loggingout =()=>{
      navigate("/");
      sessionStorage.clear();
    }
    const toggleIsUserMenuOpen = useCallback(
      () => setIsUserMenuOpen((isUserMenuOpen) => !isUserMenuOpen),
      [],
    );
  console.log(props)
    const toggleIsSecondaryMenuOpen = useCallback(
      () => setIsSecondaryMenuOpen((isSecondaryMenuOpen) => !isSecondaryMenuOpen),
      [],
    );
  
    const handleSearchResultsDismiss = useCallback(() => {
      setIsSearchActive(false);
      setSearchValue('');
    }, []);
  
    const handleSearchChange = useCallback((value) => {
      setSearchValue(value);
      setIsSearchActive(value.length > 0);
    }, []);
  
    const handleNavigationToggle = useCallback(() => {
      console.log('toggle navigation visibility');
    }, []);
  
    const logo = {
      width: 44,
      topBarSource:
        'https://cdn.shopify.com/app-store/listing_images/0632f97b04f3464ee3d9148e7b84c9a9/icon/CMP07ajunPQCEAE=.png',
    };
  
    const userMenuMarkup = (
      <TopBar.UserMenu
        actions={[
          {
            items: [{content: 'Back to Shopify', icon: ArrowLeftMinor}],
          },
          {
            items: [{content: 'Logout',onAction:loggingout}],
          },
        ]}
        name={sessionStorage.getItem("username")}
        detail={sessionStorage.getItem("username")}
        initials={sessionStorage.getItem("username")[0]}
        open={isUserMenuOpen}
        onToggle={toggleIsUserMenuOpen}
      />
    );
  
    const searchResultsMarkup = (
      <ActionList
        items={[{content: 'Shopify help center'}, 
        {content: 'Community forums'}]}
      />
    );
  
    const searchFieldMarkup = (
      <TopBar.SearchField
        onChange={handleSearchChange}
        value={searchValue}
        placeholder="Search"
        showFocusBorder
      />
    );


  
    const secondaryMenuMarkup = (
      <TopBar.Menu
        activatorContent={
          <span>
            <Icon source={QuestionMarkMajor} />
            <VisuallyHidden>Secondary menu</VisuallyHidden>
          </span>
        }
        open={isSecondaryMenuOpen}
        onOpen={toggleIsSecondaryMenuOpen}
        onClose={toggleIsSecondaryMenuOpen}
        actions={[
          {
            items: [{content: 'Community forums'}],
          },
        ]}
      />
    );


    const companyName = (
      <TopBar.Menu
        activatorContent={
          <span>
            
            <Heading>Amazon Cedcommerce</Heading>
          </span>
        }
        open={isSecondaryMenuOpen}
        onOpen={toggleIsSecondaryMenuOpen}
        onClose={toggleIsSecondaryMenuOpen}
        actions={[
          {
            items: [{content: 'Community forums'}],
          },
        ]}
      />
    );
  
    const topBarMarkup = (
      <TopBar
        showNavigationToggle
        userMenu={userMenuMarkup}
        secondaryMenu={secondaryMenuMarkup}
        searchResultsVisible={isSearchActive}
        searchField={companyName}
        // searchField={searchFieldMarkup}
        searchResults={searchResultsMarkup}
        onSearchResultsDismiss={handleSearchResultsDismiss}
        onNavigationToggle={handleNavigationToggle}
      />
    );
  
    return (
      <div style={{height: '60px'}}>
        <Frame topBar={topBarMarkup} logo={logo} />
      </div>
    );
  }
  export default TopNavbar