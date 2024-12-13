import { useState, useEffect } from 'react';
import { Box, InputBase, Button, styled, Card, CardContent, Typography } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import Header from '../components/Header';
import { getAllPosts } from '../services/api';

const SearchContainer = styled(Box)({
    marginTop: 74,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& > div': {
        width: 500,
        height: 45,
        border: '1px solid #ccc',
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        marginRight: 20,
        backgroundColor: '#f7f7f7',
    },
    '& > div > div': {
        width: '85%',
        margin: '0 20px',
        color: '#333',
    },
});

const FindButton = styled(Button)({
    background: 'linear-gradient(45deg, #6a11cb, #2575fc)', // Vibrant gradient
    color: '#fff',
    textTransform: 'none',
    height: 45,
    borderRadius: 10,
    width: 100,
    '&:hover': {
        background: 'linear-gradient(45deg, #2575fc, #6a11cb)', // Reverse gradient on hover
    },
});

const PostWrapper = styled(Box)({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 50,
    gap: 20,
    padding: 20,
    backgroundColor: '#f9f9f9', // Light background for contrast
    borderRadius: 10,
});

const StyledCard = styled(Card)({
    borderRadius: 15,
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)', // Stronger shadow for depth
    transition: 'transform 0.3s, box-shadow 0.3s',
    width: '100%',
    maxWidth: 350,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    background: 'linear-gradient(to bottom, #ffffff, #f1f1f1)', // Subtle gradient background
    '&:hover': {
        transform: 'translateY(-12px)',
        boxShadow: '0 12px 30px rgba(0, 0, 0, 0.25)',
    },
});

const CardImage = styled(Box)({
    height: 150,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderBottom: '4px solid #2575fc', // Adds a highlight
});

const StyledCardContent = styled(CardContent)({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: '16px',
    '& > *:not(:last-child)': {
        marginBottom: 12,
    },
    '& .MuiTypography-h5': {
        fontWeight: 600,
        color: '#333',
    },
    '& .MuiTypography-body2': {
        color: '#555',
    },
    '& .MuiTypography-caption': {
        color: '#888',
        fontSize: '0.8rem',
    },
});

const Badge = styled(Box)({
    background: 'linear-gradient(45deg, #ff6a00, #ee0979)',
    color: '#fff',
    padding: '4px 12px',
    borderRadius: 20,
    fontSize: '0.75rem',
    fontWeight: 600,
    textAlign: 'center',
    alignSelf: 'flex-start',
});

const AllPosts = () => {
    const [posts, setPosts] = useState([]);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await getAllPosts();
                if (response && response.data) {
                    setPosts(response.data);
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, []);

    const filteredPosts = (posts || []).filter(post =>
        post.profile.toLowerCase().includes(text.toLowerCase())
    );

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <>
            <Header />
            <SearchContainer>
                <Box>
                    <InputBase 
                        placeholder="Search for jobs..."
                        onChange={(e) => setText(e.target.value)}
                    />
                    <SearchIcon style={{ color: '#333' }} />
                </Box>
                <FindButton variant="contained">Find</FindButton>
            </SearchContainer>
            <PostWrapper>
                {
                    filteredPosts.length > 0 ? (
                        filteredPosts.map(post => (
                            <StyledCard key={post.id}>
                                <CardImage
                                    style={{
                                        backgroundImage: `url(https://via.placeholder.com/350x150?text=${post.profile})`,
                                    }}
                                />
                                <StyledCardContent>
                                    <Typography variant="h5">{post.profile}</Typography>
                                    <Badge>{post.type === "Offline" ? "Office" : "Remote"}</Badge>
                                    <Typography variant="body2">💰 {post.salary}</Typography>
                                    <Typography variant="body2">
                                        {post.description.length > 100
                                            ? `${post.description.substring(0, 100)}...`
                                            : post.description}
                                    </Typography>
                                    <Typography variant="body2">
                                        <b>Experience:</b> {post.experience}
                                    </Typography>
                                    <Typography variant="body2">
                                        <b>Technology:</b> {post.technology.join(', ')}
                                    </Typography>
                                    <Typography variant="caption">
                                        Posted on {new Date(post.createdAt).toLocaleDateString()}
                                    </Typography>
                                </StyledCardContent>
                            </StyledCard>
                        ))
                    ) : (
                        <Typography>No jobs found</Typography>
                    )
                }
            </PostWrapper>
        </>
    );
};

export default AllPosts;
