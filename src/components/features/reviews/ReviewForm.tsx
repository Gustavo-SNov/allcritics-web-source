"use client"

import React, {useState} from "react";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button"
import {Content} from "@/types/Content"
import {SquarePlus, Star} from "lucide-react";
import {ReviewCreate} from "@/types/Review";
import {Textarea} from "@/components/ui/textArea";
import {Input} from "@/components/ui/input";

interface ReviewFormProps {
    content: Content;
    createReview(review: ReviewCreate): Promise<void>;
}

const ReviewForm = ({content, createReview}: ReviewFormProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const [hoverRating, setHoverRating] = useState(0);
    const [review, setReview] = useState<ReviewCreate>({
        idContent: content.idContent,
        title: "",
        rate: 0.0,
        comment: ""
    });

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        event.preventDefault();
        try{
            await createReview(review);
            setOpen(!open);
        } catch (error) {
            console.error("Falha ao criar o review",error);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline"
                        className="bg-transparent border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white">
                    Create Review
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-gray-700 text-white w-[95vw] sm:max-w-lg rounded-md">
                <DialogHeader>
                    <DialogTitle className="text-center text-xl">
                        {`New Review to ${content.title}`}
                    </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="space-y-3">
                        <div className="flex items-center space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    className={`w-7 h-7 cursor-pointer transition-colors ${
                                        star <= (hoverRating || review.rate) 
                                            ? 'text-yellow-400 fill-yellow-400'
                                            : 'text-gray-600'
                                    }`}
                                    onClick={() => setReview({...review, rate: star})}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                />
                            ))}
                        </div>
                        <Input
                            name="title"
                            placeholder="Reviews Title"
                            value={review.title}
                            onChange={(e) => setReview({...review, title: e.target.value})}
                            required
                            className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                        />
                        <Textarea
                            value={review.comment}
                            onChange={(e) => setReview({...review, comment: e.target.value})}
                            placeholder="Escreva sua crítica aqui..."
                            className="bg-gray-900 border-gray-600 text-gray-200 placeholder:text-gray-500 focus:ring-purple-500 focus:border-purple-500"
                            rows={4}
                        />
                    </div>
                    <Button
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                        onClick={(event) => handleSubmit(event)}
                    >
                        <SquarePlus/>
                        Add Review
                    </Button>
                </div>
            </DialogContent>


        </Dialog>
    )
}

export default ReviewForm;
