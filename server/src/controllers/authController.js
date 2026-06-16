const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }

       const token = jwt.sign(
    {
        userId: user.id
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "7d"
    }
);

res.json({
    success: true,
    token
});

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }
};
const register = async (req, res) => {
  try {

    const { name, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    const bcrypt = require("bcrypt");

const hashedPassword = await bcrypt.hash(password, 10);

const user = await prisma.user.create({
  data: {
    name,
    email,
    password: hashedPassword
  }
});

    res.status(201).json({
      success: true,
      user
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};
const getCurrentUser = async (
    req,
    res
) => {

    try {

        const user =
            await prisma.user.findUnique({
                where: {
                    id: req.user.userId
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    createdAt: true
                }
            });

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });

        }

        res.json({
            success: true,
            user
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};
const getProfileStats = async (
    req,
    res
) => {

    try {

        const resumes =
            await prisma.resume.findMany({
                where: {
                    userId:
                        req.user.userId
                },
                include: {
                    analysis: true
                }
            });

        const totalResumes =
            resumes.length;

        const analyzed =
            resumes.filter(
                (r) => r.analysis
            );

        const averageATS =
            analyzed.length > 0
                ? Math.round(
                    analyzed.reduce(
                        (sum, r) =>
                            sum +
                            r.analysis.atsScore,
                        0
                    ) /
                    analyzed.length
                )
                : 0;

        const bestATS =
            analyzed.length > 0
                ? Math.max(
                    ...analyzed.map(
                        (r) =>
                            r.analysis
                                .atsScore
                    )
                )
                : 0;

        res.json({
            success: true,
            stats: {
                totalResumes,
                averageATS,
                bestATS
            }
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message:
                "Server Error"
        });

    }

};
module.exports = {
    register,
    login,
    getCurrentUser,
    getProfileStats
};