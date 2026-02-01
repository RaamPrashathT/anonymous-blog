export default function AboutPage() {
    return (
        <div className="flex flex-col py-5 mt-2">
            <span className="text-center text-4xl font-bold">About Us:</span>
            <div className="whitespace-pre-line w-[95%] sm:w-[80%] md:w-[70%] mx-auto mt-10">
                {`This is a place to write without a name attached.

                    No profiles to polish. No algorithms begging for engagement. No pressure to be anything other than honest.

                    This platform exists for thoughts that don’t fit neatly anywhere else unfinished ideas, quiet confessions, late-night realizations, strong opinions, weak moments, and everything in between. Whether you’re venting, storytelling, questioning, or just thinking out loud, you’re welcome here.

                    Posts are anonymous by design. What matters is the content, not who you are, how many followers you have, or how you’re perceived. Write freely. Read openly. Take what resonates and leave the rest.

                    This isn’t about chasing perfection or virality. It’s about expression, curiosity, and the raw human need to be heard even if no one ever knows your name.

                    Say what you need to say.
                    Someone out there might need to read it.`}
            </div>
        </div>
    )
}