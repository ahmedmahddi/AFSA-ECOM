//trpc
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { describe } from "node:test";
import { z } from "zod";

export const reviewsRouter = createTRPCRouter({
    getOne: protectedProcedure
        .input(
            z.object({
                productId: z.string()
            })
        )
        .query(async ({ ctx, input }) => {
            const product = await ctx.db.findByID({
                collection: "products",
                id: input.productId
            });

            if (!product) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Product not found"
                });
            }

            const reviewsData = await ctx.db.find({
                collection: "reviews",
                limit: 1,
                where: {
                    and: [
                        {
                            product: {
                                equals: product.id,
                            }
                        },
                        {
                            user: {
                                equals: ctx.session.user.id
                            }
                        }
                    ]
                }
            })
            const review = reviewsData.docs[0];

            if (!review) {
                return null;
            }


            return review;
        }),
    create: protectedProcedure
        .input(
            z.object({
                productId: z.string(),
                rating: z.number().min(1, { message: "Rating is required" }).max(5),
                description: z.string().min(1, { message: "Description is required" })
            })
        )
        .mutation(async ({ ctx, input }) => {
            const product = await ctx.db.findByID({
                collection: "products",
                id: input.productId
            });

            if (!product) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Product not found"
                });
            }

            const exisistingReviewData = await ctx.db.find({
                collection: "reviews",
                where: {
                    and: [
                        {
                            product: {
                                equals: input.productId,
                            }
                        },
                        {
                            user: {
                                equals: ctx.session.user.id
                            }
                        }
                    ]
                }
            })
            if (exisistingReviewData.totalDocs > 0) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "You have already reviewed this product"
                });
            }

            const review = await ctx.db.create({
                collection: "reviews",
                data: {
                    product: product.id,
                    user: ctx.session.user.id,
                    rating: input.rating,
                    description: input.description
                }
            })

            return review;
        }),
    update: protectedProcedure
        .input(
            z.object({
                reviewId: z.string(),
                rating: z.number().min(1, { message: "Rating is required" }).max(5),
                description: z.string().min(1, { message: "Description is required" })
            })
        )
        .mutation(async ({ ctx, input }) => {
            const exisistingReview = await ctx.db.findByID({
                collection: "reviews",
                id: input.reviewId,
                depth: 0
            });

            if (!exisistingReview) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Product not found"
                });
            }

            if (exisistingReview.user !== ctx.session.user.id) {
                throw new TRPCError({
                    code: "FORBIDDEN",
                    message: "You are not allowed to update this review"
                });
            }


            const updatedReview = await ctx.db.update({
                collection: "reviews",
                id: input.reviewId,
                data: {
                    rating: input.rating,
                    description: input.description
                }
            })

            return updatedReview;
        }),
});
